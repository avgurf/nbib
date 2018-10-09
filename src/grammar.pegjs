Bibliography = newline* entities:Entries newline* { return entities }

Entries
	= head:EntryOrComment newline+ tail:Entries { return [head, ...tail] }
    / head:EntryOrComment { return [head] }

EntryOrComment = Entry / Comment

Comment
    = "#" content:NewlineString { return { type:'comment', content } }

Entry "bibliography entry"
	= type:EntryType __ ":" _ label:NewlineString newline fields:Fields { return { type, label, fields } }

EntryType "entry type"
	= "article" / "book" / "booklet" / "inbook" / "incollection" / "inproceedings"
	/ "manual" / "mastersthesis" / "misc" / "online" / "phdthesis" / "proceedings"
    / "techreport" / "unpublished"

Fields "attributes" = Fields2 / Fields4 / FieldsTab

Fields2
	= "  " head:Field newline tail:Fields { return [head, ...tail] }
    / "  " head:Field { return [head] }

Fields4 "attributes"
	= "    " head:Field newline tail:Fields { return [head, ...tail] }
    / "    " head:Field { return [head] }

FieldsTab "attributes"
	= [\t] head:Field newline tail:Fields { return [head, ...tail] }
    / [\t] head:Field { return [head] }

Field "attribute"
	= type:WhitespaceString _ "=" _ value:NewlineString
    { return { type: type.toLowerCase(), value } }

NewlineString "string" = [^\r\n]+ { return text().trim() }
WhitespaceString "string" = [^ \t]+ { return text() }

_ "whitespace" = [ \t]+
__ "whitespace" = [ \t]*

newline "line break" = [(\r\n)\r\n]