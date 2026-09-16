#!/usr/bin/perl
# Turns reviewer rows into the final rename plan.
#
# In : rows on STDIN, one per photo, in reviewer rank order within each project:
#        <projectNorm>|<index>|<slug>|<score>|<note>|<original path>
#      /tmp/casa-alta-work/priority.txt
#        <projectNorm>|<projectSlug>      one per line, best project first
#      /tmp/casa-alta-work/exclusions.txt
#        <projectNorm>|<index>|<reason>
#
# Out: plan lines "<projOrder>|<projSlug>|<imgOrder>|<slug>|<original path>"
#      and a manifest "<projOrder>|<projSlug>|<imgOrder>|<slug>|<score>|<note>"
use strict;
use warnings;

my $PRIO = "/tmp/casa-alta-work/priority.txt";
my $EXCL = "/tmp/casa-alta-work/exclusions.txt";

# --- exclusions
my %excluded;
if (open my $ef, '<', $EXCL) {
    while (<$ef>) {
        chomp;
        next if /^\s*#/ || /^\s*$/;
        my ($p, $i) = split /\|/;
        $excluded{"$p|$i"} = 1 if defined $i;
    }
    close $ef;
}

# --- rows, order preserved
my (%rows, %seen);
while (<STDIN>) {
    chomp;
    next if /^\s*$/;
    my ($proj, $idx, $slug, $score, $note, $orig) = split /\|/, $_, 6;
    next unless defined $orig;
    if ($excluded{"$proj|$idx"}) { warn "excluida: $proj idx $idx\n"; next; }
    warn "DUPLICADO: $proj idx $idx\n" if $seen{"$proj|$idx"}++;
    push @{ $rows{$proj} }, { idx => $idx, slug => $slug, score => $score,
                              note => $note, orig => $orig };
}

# --- priority order
my @prio;
if (open my $pf, '<', $PRIO) {
    while (<$pf>) {
        chomp;
        next if /^\s*#/ || /^\s*$/;
        my ($p, $s) = split /\|/;
        push @prio, { norm => $p, slug => $s } if defined $s;
    }
    close $pf;
} else {
    die "falta $PRIO\n";
}

# --- emit
my (@plan, @manifest, %done);
my $po = 0;
for my $p (@prio) {
    my $r = $rows{ $p->{norm} };
    if (!$r) { warn "sin filas para $p->{norm} (¿typo en priority.txt?)\n"; next; }
    $po++;
    $done{ $p->{norm} } = 1;
    my $pn = sprintf('%02d', $po);
    my $io = 0;
    for my $row (@$r) {
        $io++;
        my $in = sprintf('%02d', $io);
        push @plan,     join('|', $pn, $p->{slug}, $in, $row->{slug}, $row->{orig});
        push @manifest, join('|', $pn, $p->{slug}, $in, $row->{slug},
                                  $row->{score}, $row->{note});
    }
}

for my $k (sort keys %rows) {
    warn "proyecto sin prioridad asignada, se omite: $k (" . scalar(@{$rows{$k}}) . " fotos)\n"
        unless $done{$k};
}

open my $pl, '>', "/tmp/casa-alta-work/plan.txt" or die $!;
print $pl "$_\n" for @plan;
close $pl;

open my $mf, '>', "/tmp/casa-alta-work/manifest.txt" or die $!;
print $mf "$_\n" for @manifest;
close $mf;

printf STDERR "plan: %d fotos en %d proyectos\n", scalar(@plan), $po;
print "$_\n" for @plan;
