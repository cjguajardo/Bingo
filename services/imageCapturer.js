import { captureRef } from 'react-native-view-shot';
import ccapture from 'ccapture.js';

const captureViews = async ( capturerRef, viewsArrayRef ) => {
  try {
    const capturer = capturerRef.current;
    const capturedImages = [];

    capturer.start();

    for ( let i = 0; i < viewsArrayRef.length; i++ ) {
      const view = viewsArray[i];
      await captureRef( view, { format: 'png', quality: 1 } ).then( ( uri ) => {
        capturer.captureURI( uri );
        capturedImages.push( uri );
      } );
    }

    capturer.stop();

    capturer.save( ( blob ) => {
      const url = URL.createObjectURL( blob );
      console.log( 'Image saved to', url );
      // Do something with the captured image URL, such as displaying it or saving it to the device
    } );
  } catch ( error ) {
    console.error( 'Oops, snapshot failed', error );
  }
};

export default captureViews;
