If you are using react-scripts 4.0.0 like me then all you need to do is remove the line (around line 160 on my end):

paths: { value: undefined, reason: 'aliased imports are not supported' }

from the file node_modules/react-scripts/scripts/utils/verifyTypeScriptSetup.js

localhost:4200/dash