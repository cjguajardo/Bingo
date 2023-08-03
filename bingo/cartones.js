import {
  bingo_75,
  loteria_54,
  bingo_27,
  loteria_27,
} from './distribuciones.js';

export const configuracion = ( tipo ) => {
  let distribucion = null;
  let filas = 0;
  let letras = false;
  switch ( tipo ) {
    case 'bingo_90':
      distribucion = bingo_75;
      filas = 5;
      break;
    case 'bingo_75':
      distribucion = bingo_75;
      filas = 5;
      break;
    case 'loteria_54':
      distribucion = loteria_54;
      filas = 3;
      break;
    case 'bingo_27':
      distribucion = bingo_27;
      letras = true;
      filas = 3;
      break;
    case 'loteria_27':
      distribucion = loteria_27;
      letras = true;
      filas = 3;
      break;
  }

  if ( distribucion === null ) {
    return null;
  }

  const carton_base = { B: [], I: [], N: [], G: [], O: [] };

  return { carton_base, distribucion, filas, letras };
}

export const llenaLetras = async ( carton_base, distribucion, rows = 3 ) => {
  // console.log( 'llenaLetras', { carton, distribucion } );
  const carton = {};

  //create keys
  for ( const key of Object.keys( carton_base ) ) {
    carton[key] = [];
  }

  for await ( const key of Object.keys( carton ) ) {
    const rStart = distribucion[key][0];
    const rEnd = distribucion[key][1];
    // console.log( { key, rStart, rEnd } );
    let i = 0;
    while ( carton[key].length < rows ) {
      const random = Math.floor( Math.random() * ( rEnd - rStart + 1 ) ) + rStart;
      const newLetter = String.fromCharCode( random );
      // console.log( { key, random, newLetter } );
      if ( carton[key].indexOf( newLetter ) === -1 ) {
        carton[key][i] = newLetter;
        i++;
      }

      if ( i > rows ) {
        break;
      }
    }
  }

  return { ...carton };
}

export const llenaNumeros = async ( carton, distribucion, rows = 5 ) => {
  // console.log( 'llenaNumeros', { carton, distribucion } );

  for ( const key in carton ) {
    const rStart = distribucion[key][0];
    const rEnd = distribucion[key][1];
    // console.log( { key, rStart, rEnd } );
    let i = 0;
    while ( true ) {
      const random = Math.floor( Math.random() * ( rEnd - rStart + 1 ) ) + rStart;
      if ( !carton[key].includes( random ) ) {
        carton[key][i] = random;
        i++;
      }
      if ( i === rows ) {
        break;
      }
    }
  }

  return { ...carton };
}

export const creaCarton = async ( configuracion ) => {
  const { carton_base, distribucion, filas, letras } = configuracion;

  const carton = ( letras )
    ? await llenaLetras( { ...carton_base }, distribucion, 3 )
    : await llenaNumeros( { ...carton_base }, distribucion, filas );

  return carton;
}

export const creaCartones = async ( configuracion, cantidad ) => {
  const cartones = [];
  for ( let i = 0; i < cantidad; i++ ) {
    const carton = await creaCarton( configuracion );
    cartones.push( carton );
  }
  return cartones;
}

export default { configuracion, llenaLetras, llenaNumeros, creaCarton };
