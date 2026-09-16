#!/usr/bin/perl
# Parses the reviewers' markdown ranking blocks and joins them with the index maps.
#
# Emits one row per photo:
#   <projectNorm>|<index>|<slug>|<score>|<note>|<original path relative to images/>
#
# projectNorm is the project heading lowercased with non-alphanumerics stripped;
# it matches the .map filename the same way, so lookups are unambiguous.
use strict;
use warnings;

my $mapdir = "/tmp/casa-alta-work/index";
my $srcdir = "/Users/hendrick/Documents/arquitectura-casa-alta-web/images";

# --- index the map files by normalized project name
my %maps;
for my $f (glob("$mapdir/*.map")) {
    (my $base = $f) =~ s{.*/}{};
    $base =~ s{\.map$}{};
    (my $norm = lc $base) =~ s/[^a-z0-9]//g;
    $maps{$norm} = $f;
}

# --- load each map: "01|filename"
my %name_of;
for my $norm (keys %maps) {
    open my $fh, '<', $maps{$norm} or die "no puedo abrir $maps{$norm}: $!";
    while (<$fh>) {
        chomp;
        my ($idx, $file) = split /\|/, $_, 2;
        next unless defined $file;
        $name_of{$norm}{$idx} = $file;
    }
    close $fh;
}

# --- manual slug corrections: "<projectNorm>|<index>|<slug>"
my %override;
if (open my $of, '<', "/tmp/casa-alta-work/slug-overrides.txt") {
    while (<$of>) {
        chomp;
        next if /^\s*#/ || /^\s*$/;
        my ($p, $i, $s) = split /\|/;
        $override{ lc($p) . "|$i" } = $s if defined $s;
    }
    close $of;
}

# --- walk the reviewers' output
my ($cur, $seen_proj) = (undef, 0);
my @rows;
my %unknown_proj;

while (my $line = <STDIN>) {
    chomp $line;

    if ($line =~ /^###\s+(.+?)\s*$/) {
        my $head = $1;
        $head =~ s/^\**//; $head =~ s/\**$//;
        (my $norm = lc $head) =~ s/[^a-z0-9]//g;
        if (exists $maps{$norm}) {
            $cur = $norm;
            $seen_proj++;
        } else {
            $unknown_proj{$head} = 1;
            $cur = undef;
        }
        next;
    }

    next unless defined $cur;

    # ranking row: "01 | slug-propuesto | 5 | nota"
    next unless $line =~ /^\s*(\d{1,3})\s*\|\s*([A-Za-z0-9][A-Za-z0-9-]*)\s*\|\s*([1-5])\s*\|\s*(.*?)\s*$/;
    my ($idx, $slug, $score, $note) = ($1, $2, $3, $4);

    my $orig = $name_of{$cur}{ sprintf('%02d', $idx) };
    if (!defined $orig) {
        printf STDERR "AVISO: %s indice %s no esta en el mapa\n", $cur, $idx;
        next;
    }

    $slug = $override{"$cur|$idx"} if exists $override{"$cur|$idx"};

    push @rows, join('|', $cur, sprintf('%02d', $idx), $slug, $score, $note, $orig);
}

print STDERR "proyectos reconocidos: $seen_proj\n";
print STDERR "proyectos sin mapa: " . join(', ', sort keys %unknown_proj) . "\n" if %unknown_proj;
print STDERR "filas emitidas: " . scalar(@rows) . "\n";

print "$_\n" for @rows;
