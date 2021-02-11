# Ionic + Vue 
## Install  
npm install -g @ionic/cli@latest native-run cordova-res
ionic start xxApp tabs --type vue --capacitor  
npm install @ionic/pwa-elements  
cd xxApp > ionic serve  

## Build  
ionic integrations enable capacitor
ionic build  
ionic cap add ios  
ionic cap add android  
ionic cap open ios  
ionic cap open android  
ionic cap copy  
ionic cap sync  
  
## Live Reload  
ionic cap run ios -l --external  
ionic cap run android -l --external  