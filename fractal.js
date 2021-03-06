'use strict';

const cssLib = require('./index');

/* Create a new Fractal instance and export it for use elsewhere if required */
const fractal = module.exports = require('@frctl/fractal').create();
const nunj = require('@frctl/nunjucks')({
    filters: {
      /*
        Optional attribute filter.

        If the input is truthy, it is output in the form
        of an attribute value. Otherwise, an empty string
        is returned.

        This is useful for HTML attributes that should only
        be added if their value is defined.
      */
      optattr: function(str, attrName){
        if(str){
          return ` ${attrName}="${str}"`;
        }
        else {
          return '';
        }
      }
    }
});

/* Set the title of the project */
fractal.set('project.title', cssLib.name);
fractal.set('project.version', cssLib.version);


/* Tell Fractal where the components will live */
fractal.components.set('path', cssLib.dirs.sgSrc.components);
// register the Nunjucks adapter for your components
fractal.components.engine(nunj);
// look for files with a .nunj file extension
fractal.components.set('ext', '.nunj');


/* Tell Fractal where the documentation pages will live */
fractal.docs.set('path', cssLib.dirs.sgSrc.docs);
// Set engine to Nunjucks
fractal.docs.engine(nunj);
fractal.docs.set('ext', '.md');


/* Tell Fractal which directory to serve up for static assets */
fractal.web.set('static.path', cssLib.dirs.dist);
/* Tell Fractal which directory to build static HTML output to */
fractal.web.set('builder.dest', cssLib.dirs.sgDist);
