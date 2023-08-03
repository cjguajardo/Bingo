import { creaCarton, configuracion, llenaLetras, llenaNumeros } from '../bingo/cartones.js';
import distribuciones from '../bingo/distribuciones.js';

const arrayHasUniqueLettersAndMatchOrigArrLength = ( array ) => {
  const uniqueLetters = [...new Set( array )];
  const uniqueLettersLength = uniqueLetters.filter( element => /^[a-zA-Z]+$/.test( element ) ).length;
  // console.log( { uniqueLettersLength } );
  return array.length === uniqueLettersLength;
}

const arrayHasUniqueNumbersAndMatchOrigArrLength = ( array ) => {
  const uniqueNumbers = [...new Set( array )];
  return array.length === uniqueNumbers.length;
}

const carton_base = { B: [], I: [], N: [], G: [], O: [] };

test( 'should match rows length', async () => {
  const result2 = await creaCarton( {
    carton_base, distribucion: distribuciones.bingo_27, filas: 3, letras: true
  } );
  expect( result2.B.length ).toEqual( 3 );
  expect( result2.I.length ).toEqual( 3 );
  expect( result2.N.length ).toEqual( 3 );
  expect( result2.G.length ).toEqual( 3 );
  expect( result2.O.length ).toEqual( 3 );

  const result = await creaCarton( {
    carton_base, distribucion: distribuciones.bingo_75, filas: 5, letras: false
  } );
  expect( result.B.length ).toEqual( 5 );
  expect( result.I.length ).toEqual( 5 );
  expect( result.N.length ).toEqual( 5 );
  expect( result.G.length ).toEqual( 5 );
  expect( result.O.length ).toEqual( 5 );

} );

test( 'bingo_27 should return 3 elements per item and each item must be a unique letter', async () => {

  const carton = {
    B: [],
    I: [],
    N: [],
    G: [],
    O: []
  };
  const result2 = await llenaLetras( carton, distribuciones.bingo_27 );
  // console.log( { result2 } );

  expect( arrayHasUniqueLettersAndMatchOrigArrLength( result2.B ) ).toEqual( true );
  expect( arrayHasUniqueLettersAndMatchOrigArrLength( result2.I ) ).toEqual( true );
  expect( arrayHasUniqueLettersAndMatchOrigArrLength( result2.N ) ).toEqual( true );
  expect( arrayHasUniqueLettersAndMatchOrigArrLength( result2.G ) ).toEqual( true );
  expect( arrayHasUniqueLettersAndMatchOrigArrLength( result2.O ) ).toEqual( true );
} );

test( 'bingo_75 should return 5 elements per item and each item must be a unique number', async () => {

  const carton = {
    B: ['#', '#', '#', '#', '#'],
    I: ['#', '#', '#', '#', '#'],
    N: ['#', '#', '#', '#', '#'],
    G: ['#', '#', '#', '#', '#'],
    O: ['#', '#', '#', '#', '#']
  };
  const result2 = await llenaNumeros( carton, distribuciones.bingo_75 );
  // console.log( { result2 } );

  expect( arrayHasUniqueNumbersAndMatchOrigArrLength( result2.B ) ).toEqual( true );
  expect( arrayHasUniqueNumbersAndMatchOrigArrLength( result2.I ) ).toEqual( true );
  expect( arrayHasUniqueNumbersAndMatchOrigArrLength( result2.N ) ).toEqual( true );
  expect( arrayHasUniqueNumbersAndMatchOrigArrLength( result2.G ) ).toEqual( true );
  expect( arrayHasUniqueNumbersAndMatchOrigArrLength( result2.O ) ).toEqual( true );
} )

test( 'bingo_27 sould return 1 carton and each item should have 3 unique letters per row', async () => {
  const carton = await creaCarton( {
    carton_base, distribucion: distribuciones.bingo_27, filas: 3, letras: true
  } );

  expect( arrayHasUniqueLettersAndMatchOrigArrLength( carton.B ) ).toEqual( true );
  expect( arrayHasUniqueLettersAndMatchOrigArrLength( carton.I ) ).toEqual( true );
  expect( arrayHasUniqueLettersAndMatchOrigArrLength( carton.N ) ).toEqual( true );
  expect( arrayHasUniqueLettersAndMatchOrigArrLength( carton.G ) ).toEqual( true );
  expect( arrayHasUniqueLettersAndMatchOrigArrLength( carton.O ) ).toEqual( true );

} )

test( 'bingo_27 each letter must be in the range of the distribution', async () => {
  const carton = await creaCarton( {
    carton_base, distribucion: distribuciones.bingo_27, filas: 3, letras: true
  } );
  expect( String.fromCharCode( distribuciones.bingo_27.B[0] ) <= carton.B[0] && carton.B[0] <= String.fromCharCode( distribuciones.bingo_27.B[1] ) ).toEqual( true );
  expect( String.fromCharCode( distribuciones.bingo_27.I[0] ) <= carton.I[0] && carton.I[0] <= String.fromCharCode( distribuciones.bingo_27.I[1] ) ).toEqual( true );
  expect( String.fromCharCode( distribuciones.bingo_27.N[0] ) <= carton.N[0] && carton.N[0] <= String.fromCharCode( distribuciones.bingo_27.N[1] ) ).toEqual( true );
  expect( String.fromCharCode( distribuciones.bingo_27.G[0] ) <= carton.G[0] && carton.G[0] <= String.fromCharCode( distribuciones.bingo_27.G[1] ) ).toEqual( true );
  expect( String.fromCharCode( distribuciones.bingo_27.O[0] ) <= carton.O[0] && carton.O[0] <= String.fromCharCode( distribuciones.bingo_27.O[1] ) ).toEqual( true );

} )