require('blanket')({
	"pattern": "{%= projectRoot %}",
    "data-cover-never": "[node_modules, /test]"
});