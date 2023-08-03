// Desc: Service to create PDF from images
import jsPDF from 'jspdf';

const createPDF = async ( images, download = false ) => {
  try {
    const doc = new jsPDF();

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const imageWidth = 190;
    const imageHeight = 0; // Will be calculated based on the first image's aspect ratio

    if ( images.length > 0 ) {
      const firstImage = new Image();
      firstImage.src = images[0];

      firstImage.onload = () => {
        const aspectRatio = firstImage.width / firstImage.height;
        const imageHeight = imageWidth / aspectRatio;

        const imagesFitOnPage = Math.floor( pageHeight / imageHeight );
        const imagesPerRow = Math.floor( pageWidth / imageWidth );
        const imagesPerPage = imagesFitOnPage * imagesPerRow;

        for ( let i = 0; i < images.length; i += imagesPerPage ) {
          const pageImages = images.slice( i, i + imagesPerPage );

          for ( let j = 0; j < pageImages.length; j++ ) {
            const rowIndex = Math.floor( j / imagesPerRow );
            const colIndex = j % imagesPerRow;

            const x = 10 + colIndex * imageWidth;
            const y = 10 + rowIndex * imageHeight;

            doc.addImage( pageImages[j], 'JPEG', x, y, imageWidth, imageHeight );
          }

          if ( i + imagesPerPage < images.length ) {
            doc.addPage();
          }
        }

        if ( download ) {
          doc.save( 'test.pdf' );
        } else {
          const pdfBlob = doc.output( 'blob' );
          const pdfUrl = URL.createObjectURL( pdfBlob );
          return pdfUrl;
        }
      };
    } else {
      console.error( 'No images provided' );
      return null;
    }
  } catch ( error ) {
    console.error( 'Error generating PDF:', error );
    return null;
  }
};

export default createPDF;
