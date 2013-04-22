window.StringUtils = {
	replaceAll: function (find, replace, str) {
		output = str;
		if (find == replace) return output;
  		var exists = false;
		if (str.indexOf(find) > 0)
    		exists = true;
		while (exists) // replace 'abc' as long as it exists
			{
				console.log(str)
    			str = str.replace(find,replace);
    			if (str.indexOf(find) > 0)
        			exists = true;
    			else
        			exists = false;				
			}
			return output;
		}
	}