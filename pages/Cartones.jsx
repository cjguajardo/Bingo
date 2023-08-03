import React from 'react';
import Page from '../components/Page';
import {
  Button,
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  Dimensions,
  Alert,
} from 'react-native';
import RadioButtonGroup from '../components/RadioButtonGroup';
import { configuracion, llenaLetras, llenaNumeros } from '../bingo/cartones';
import Carton from '../components/Carton';
import ViewShot from 'react-native-view-shot';
import createPDF from '../services/pdfCreator';
import Label from '../components/Label';

const Cartones = () => {
  const [ultimoGenerado, setUltimoGenerado] = React.useState(null);
  const [params, setParams] = React.useState({
    // tipo: null,
    // cantidad: 0,
    tipo: 'loteria_27',
    cantidad: 1,
  });
  const [cartonesGenerados, setCartonesGenerados] = React.useState([]);
  const [cargando, setCargando] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const viewRefs = React.useRef([]);

  const onPressHandler = id => {
    setParams({ ...params, tipo: id });
  };

  const generarCartones = async () => {
    if (params.tipo === null) {
      Alert.alert('Error', 'Debe seleccionar un tipo de cartón');
      return;
    }
    if (params.cantidad <= 0) {
      Alert.alert('Error', 'Debe seleccionar una cantidad de cartones');
      return;
    }

    setProgress(0);
    setCargando(true);
    setUltimoGenerado(null);

    //add a pause to let the loader appears
    await new Promise(resolve => setTimeout(resolve, 1000));

    const _cartonesGenerados = [];
    const config = configuracion(params.tipo);

    while (_cartonesGenerados.length < params.cantidad) {
      try {
        let carton = config.letras
          ? await llenaLetras(config.carton_base, config.distribucion)
          : await llenaNumeros(
              config.carton_base,
              config.distribucion,
              config.filas
            );
        carton.codigo = JSON.stringify(carton);
        carton.numero = _cartonesGenerados.length + 1;

        const duplicated = _cartonesGenerados.find(
          c => c.codigo === carton.codigo
        );
        if (!duplicated) {
          _cartonesGenerados.push({ ...carton, ...JSON.parse(carton.codigo) });
        } else {
          console.log('duplicated');
        }
      } catch (err) {
        console.error(err);
      }
    }

    setCargando(false);
    setCartonesGenerados([..._cartonesGenerados]);

    setUltimoGenerado(params.tipo);
  };

  const buttons = [
    // { label: 'Bingo (90)', onPress: onPressHandler, id: 'bingo_90' },
    { label: 'Bingo (75)', onPress: onPressHandler, id: 'bingo_75' },
    { label: 'Lotería (54)', onPress: onPressHandler, id: 'loteria_54' },
    { label: 'Bingo Letras (27)', onPress: onPressHandler, id: 'bingo_27' },
    { label: 'Lotería Letras (27)', onPress: onPressHandler, id: 'loteria_27' },
  ];

  const buttons2 = [
    {
      label: '10',
      onPress: () => setParams({ ...params, cantidad: 10 }),
      id: '10',
    },
    {
      label: '25',
      onPress: () => setParams({ ...params, cantidad: 20 }),
      id: '20',
    },
    {
      label: '50',
      onPress: () => setParams({ ...params, cantidad: 50 }),
      id: '50',
    },
    {
      label: '100',
      onPress: () => setParams({ ...params, cantidad: 100 }),
      id: '100',
    },
    {
      label: '500',
      onPress: () => setParams({ ...params, cantidad: 500 }),
      id: '500',
    },
    {
      label: '1500',
      onPress: () => setParams({ ...params, cantidad: 1500 }),
      id: '1500',
    },
    {
      label: '2500',
      onPress: () => setParams({ ...params, cantidad: 2500 }),
      id: '2500',
    },
  ];

  const generatePdf = async () => {
    setCargando(true);
    //add a pause to let the loader appears
    await new Promise(resolve => setTimeout(resolve, 1000));

    const images = [];
    for await (const i of Object.keys(viewRefs.current)) {
      const uri = await viewRefs.current[i].capture();
      images.push(uri);
      const progress = Math.round((i / cartonesGenerados.length) * 100);
      console.log({ progress });
      setProgress(progress);
    }

    console.log({ images: images.length });

    setProgress(0);
    await createPDF(images, true);
    setCargando(false);
  };

  React.useEffect(() => {
    generarCartones();
  }, []);

  return (
    <Page title="Cartones">
      <View style={styles.Form}>
        <View>
          <Label text="Cantidad de Cartones" />
          <RadioButtonGroup buttons={buttons2} disabled={cargando} />
        </View>

        <View>
          <Label text="Tipo de Cartón" />
          <RadioButtonGroup buttons={buttons} disabled={cargando} />
        </View>

        <View style={{ marginTop: 10 }}>
          <Button
            title="Generar"
            onPress={generarCartones}
            disabled={
              (params.tipo === null && params.cantidad <= 0) || cargando
            }
          />
        </View>

        <View style={{ marginTop: 10 }}>
          <Button
            color="#006064"
            title="Descargar PDF"
            onPress={generatePdf}
            disabled={cartonesGenerados.length <= 0 || cargando}
          />
        </View>
      </View>
      <View>
        {cargando && (
          <View style={{ padding: 20 }}>
            <ActivityIndicator size="large" color="#bada55" />
            <Text style={{ textAlign: 'center', marginTop: 10 }}>
              Un momento por favor...
            </Text>
            {progress > 0 && (
              <View>
                <Text style={{ textAlign: 'center', marginTop: 10 }}>
                  {progress}%
                </Text>
              </View>
            )}
          </View>
        )}

        <View
          style={[
            styles.preview,
            cargando
              ? { position: 'absolute', right: Dimensions.get('window').width }
              : {},
          ]}
        >
          {ultimoGenerado == null ||
            (ultimoGenerado === params.tipo &&
              cartonesGenerados.map((carton, index) => (
                <ViewShot
                  key={index}
                  ref={ref => {
                    if (ref) {
                      viewRefs.current[index] = ref;
                    }
                  }}
                  options={{ format: 'png', quality: 1 }}
                >
                  <Carton {...carton} tipo={params.tipo} />
                </ViewShot>
              )))}
        </View>
      </View>
    </Page>
  );
};

const styles = StyleSheet.create({
  Form: {
    width: '100%',
    display: 'flex',
    flexDirection: Dimensions.get('window').width > 720 ? 'row' : 'column',
    paddingHorizontal: Dimensions.get('window').width > 460 ? 20 : 0,
    marginBottom: 20,
  },
  ButtonNotSelected: {
    backgroundColor: '#FFFFFF',
    color: '#000000',
  },
  input: {
    height: 40,
    marginHorizontal: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  preview: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    // max 3 items per row
    justifyContent: 'space-between',
    // align horizontally
    alignItems: 'center',
    width: '100%',
  },
});

export default Cartones;
