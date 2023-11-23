@REM <root>
cd ./root
start npm start
cd ..
@REM </root>
 
@REM <style>
cd ./style
start npm start
cd ..
@REM </style>

@REM <angular>
cd ./angular
start npm run serve:single-spa:angular
cd ..
@REM </angular>
 
@REM <react>
cd ./react  
start npm run serve:single-spa:react
cd ..
@REM </react>
 