### nbib
##### neat bibtex bibliography

A simple tool that parses a file containing bibliography entries in nbib format 
and outputs a .bib file containing the normalized (and sorted) bibliography entries

#### The nbib format

__Example:__
```
online: gamasutra:c++functional
    Title     = In-depth: Functional programming in C++
    Author    = John Carmack
    Publisher = Gamasutra
    Pages     = 1
    Language  = English
    Year      = 2012
    Month     = 4
    url       = https://www.gamasutra.com/view/news/169296/Indepth_Functional_programming_in_C.php
    urldate   = 2018-09-21
```

The entry type and entry label must be in the format `type: label` with a line break after the label, and then at least one field.

The fields of each entry must have 2 or 4 whitespaces or a tab of indentation 
and are terminated with a newline. The type of indentation must be the same for each field of an entry.

