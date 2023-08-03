import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { stringMd5 } from 'react-native-quick-md5';

const Carton = ({ B, I, N, G, O, codigo, numero, tipo }) => {
  const esBingo = tipo.indexOf('bingo') === 0;

  const cubreRandom = Arr => {
    const random = Math.floor(Math.random() * Arr.length);
    const tieneCubiertas = Arr.findIndex(c => c === '#') !== -1;

    if (!tieneCubiertas) {
      Arr[random] = '#';
      return Arr;
    }
    return Arr;
  };

  if (esBingo) {
    const mitad = Math.floor(N.length / 2);
    N[mitad] = '#';
  } else {
    B = cubreRandom(B);
    I = cubreRandom(I);
    N = cubreRandom(N);
    G = cubreRandom(G);
    O = cubreRandom(O);
  }

  //regenera codigo
  codigo = stringMd5(JSON.stringify({ B, I, N, G, O, numero, tipo }));

  return (
    <View style={styles.Carton}>
      <View style={styles.Cabecera}>{<Cabecera bingo={esBingo} />}</View>
      <View style={styles.ContenedorCasillas}>
        <View style={styles.Columna}>
          {B.map((b, i) => (
            <Casilla valor={b} key={i} />
          ))}
        </View>
        <View style={styles.Columna}>
          {I.map((b, i) => (
            <Casilla valor={b} key={i} />
          ))}
        </View>
        <View style={styles.Columna}>
          {N.map((b, i) => (
            <Casilla valor={b} key={i} />
          ))}
        </View>
        <View style={styles.Columna}>
          {G.map((b, i) => (
            <Casilla valor={b} key={i} />
          ))}
        </View>
        <View style={styles.Columna}>
          {O.map((b, i) => (
            <Casilla valor={b} key={i} />
          ))}
        </View>
      </View>
      <View style={styles.Pie}>
        <Codigo codigo={codigo} numero={numero} />
      </View>
    </View>
  );
};

const Casilla = ({ valor, header = false, cubre = false, full = false }) => {
  cubre = valor === '#' ? true : cubre;
  let combinedStyles = [styles.Casilla];
  if (header) combinedStyles.push(styles.CasillaHeader);
  if (cubre) combinedStyles.push({ backgroundColor: 'black', color: 'black' });
  //si es full usa todo el espacio de las 5 columnas
  if (full) combinedStyles.push({ width: 500, height: 100 });

  return (
    <View style={combinedStyles}>
      {!cubre && <Text style={styles.CasillaTexto}>{valor}</Text>}
    </View>
  );
};

const Codigo = ({ codigo = '', numero = '' }) => {
  return (
    <View styles={styles.CodigoContainer}>
      {/* <Image
        style={styles.CodigoImagen}
        source={{
          uri: `https://api.qrserver.com/v1/create-qr-code/?size=50x50&data=${codigo}`,
        }}
      /> */}
      <View style={styles.Codigo}>
        <Text style={styles.Numero}>Número: {`${numero}`.padStart(5, 0)}</Text>
        <Text style={styles.Hash}>{codigo}</Text>
      </View>
    </View>
  );
};

const Cabecera = ({ bingo }) => {
  if (bingo === true) {
    return ['B', 'I', 'N', 'G', 'O'].map((letra, i) => (
      <Casilla valor={letra} header={true} key={i} />
    ));
  }
  return <Casilla valor={'l o t e r í a'} header={true} full={true} />;
};

const styles = StyleSheet.create({
  Codigo: {
    height: 25,
    flex: 1,
    flexDirection: 'column',
  },
  CodigoContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
  },
  CodigoImagen: {
    width: 50,
    height: 50,
    display: 'flex',
    justifyContent: 'center',
  },
  Pie: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  Hash: {
    color: '#44D492',
    fontSize: 10,
  },
  Numero: {
    color: '#F2EBC7',
    fontSize: 14,
    fontWeight: 'bold',
  },
  Carton: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    border: '2px solid black',
    padding: 10,
    maxWidth: 650,
    borderRadius: 15,
    backgroundColor: '#343642',
    marginBottom: 10,
  },
  ContenedorCasillas: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  Cabecera: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  Columna: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignContent: 'space-between',
  },
  Casilla: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
    border: '2px solid black',
    color: 'black',
    fontSize: 45,
    backgroundColor: 'white',
  },
  CasillaHeader: {
    backgroundColor: 'black',
    color: 'white',
    fontSize: 45,
  },
  CasillaTexto: {
    textTransform: 'uppercase',
    textAlign: 'center',
    color: 'inherit',
    fontSize: 'inherit',
    fontWeight: 'bold',
  },
});

export default Carton;
