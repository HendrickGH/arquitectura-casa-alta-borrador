#!/usr/bin/perl
# Builds manifest.json from the variant TSV, ready for a build step to consume.
#
# TSV rows:  pn|ps|in|slug|score|note|<w>:<px>:<py>:<file> ...
#
# Every input is read as UTF-8, not as raw bytes. The ranking notes carry
# accented Spanish ("lámparas", "celosía") and the source paths carry names like
# "Zimatlán (17).jpg". Read as bytes, JSON::PP escapes each byte of a multi-byte
# character on its own and the manifest ships "lÃ¡mparas" -- which then reaches
# the alt text. Decoding first makes JSON::PP emit one code point per character.
use strict;
use warnings;
use JSON::PP;

my $OUT  = "/Users/hendrick/Documents/arquitectura-casa-alta-web/images-optimizado";
my $TSV  = "/tmp/casa-alta-work/variants.tsv";
my $DIMS = "/tmp/casa-alta-work/avif-dims.txt";
my $JOIN = "/tmp/casa-alta-work/joined.txt";

# original source path per photo, so ingestion can tell what is already processed
my %source;
if (open my $jf, '<:encoding(UTF-8)', $JOIN) {
    while (<$jf>) {
        chomp;
        # joined.txt is pn|ps|in|slug|orig|score|note; orig holds no pipes,
        # so a bounded split keeps it whole and drops score/note.
        my ($pn, $ps, $in, $slug, $orig) = split /\|/, $_, 7;
        $source{"$pn|$in"} = $orig if defined $orig;
    }
    close $jf;
}

# full-size dimensions, precomputed with one identify pass
my %dims;
if (open my $df, '<:encoding(UTF-8)', $DIMS) {
    while (<$df>) {
        chomp;
        my ($w, $h, $path) = split /\s+/, $_, 3;
        next unless defined $path;
        (my $base = $path) =~ s{.*/}{};
        $dims{$base} = [$w, $h];
    }
    close $df;
}

my @projects;
my %proj_index;

open my $tf, '<:encoding(UTF-8)', $TSV or die "no puedo abrir $TSV: $!";
while (<$tf>) {
    chomp;
    next if /^\s*$/;
    my ($pn, $ps, $in, $slug, $score, $note, $entries) = split /\|/, $_, 7;
    next unless defined $entries;

    my $dir = "$pn-$ps";
    if (!exists $proj_index{$dir}) {
        $proj_index{$dir} = scalar @projects;
        push @projects, { order => $pn, slug => $ps, dir => $dir, photos => [] };
    }

    my @variants;
    my @srcset;
    my $base = "$in-$slug";

    for my $e (split /\s+/, $entries) {
        next unless $e;
        my ($target, $w, $h, $file) = split /:/, $e, 4;
        push @variants, { width => 0 + $w, height => 0 + $h, file => $file };
        push @srcset, "$file ${w}w";
    }

    # full size is the last srcset candidate
    my ($fw, $fh) = @{ $dims{"$base.avif"} || [0, 0] };
    if ($fw) {
        push @srcset, "$base.avif ${fw}w";
    }

    push @{ $projects[ $proj_index{$dir} ]{photos} }, {
        order    => $in,
        slug     => $slug,
        score    => 0 + ($score || 0),
        note     => defined $note ? $note : '',
        source   => $source{"$pn|$in"} || '',
        base     => $base,
        full     => { width => 0 + $fw, height => 0 + $fh, file => "$base.avif" },
        fallback => "$base.jpg",
        variants => \@variants,
        srcset   => join(', ', @srcset),
    };
}
close $tf;

my $doc = {
    generated => "2026-09-15",
    base      => "images-optimizado",
    note      => "AVIF is the primary format; the .jpg beside each photo is the untouched original serving as fallback.",
    tiers     => [480, 960],
    avif_quality => 62,
    stats     => {
        projects => scalar @projects,
        photos   => scalar map { @{ $_->{photos} } } @projects,
    },
    projects  => \@projects,
};

open my $of, '>', "$OUT/manifest.json" or die $!;
print $of JSON::PP->new->ascii->canonical->pretty->encode($doc);
close $of;

printf "manifest.json: %d proyectos, %d fotos\n",
    scalar @projects, scalar map { @{ $_->{photos} } } @projects;
