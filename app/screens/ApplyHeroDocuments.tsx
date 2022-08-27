import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';
import { Screens, Texts, S } from '../styles';                          
import { useNavigation } from '@react-navigation/native';               
import RoutesEnum from '../shared/RoutesEnum';                        
import NavigationHeader from '../components/NavigationHeader';      
import ScreenBackground from '../components/ScreenBackground';    
import BgDots2Svg from '../components/svgs/BgDots2Svg';         
import BgCircleSvg from '../components/svgs/BgCircleSvg';         
import LogoSvg from '../components/svgs/LogoSvg';
import TextInput from '../components/TextInput';
import LetterSvg from '../components/svgs/LetterSvg';
import UserSvg from '../components/svgs/UserSvg';
import Button from '../components/Button';
import ImageUpload from '../components/ImageUpload';
import { File } from '../shared/File';
import UserService from '../services/UserService';
import LoadingIndicator from '../components/LoadingIndicator';
import Insured from '../components/svgs/InsuredSvg';
import { ApplyAsAgent } from '../types/ApplyAsAgent';

const ApplyHeroDocuments = (): JSX.Element => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [idCardFrontFile, setIdCardFrontFile] = useState<File>();
  const [idCardBackFile, setIdCardBackFile] = useState<File>();

  const applyHero = async () => {
    try {
      setIsLoading(true);

      let idCardFrontFileId = null;
      let idCardBackFileId = null;

      if (idCardFrontFile) {
        idCardFrontFileId = await UserService.uploadFile(idCardFrontFile!);
      }

      if (idCardBackFile) {
        idCardBackFileId = await UserService.uploadFile(idCardBackFile!);
      }

      if (idCardFrontFileId && idCardBackFileId) {
        let model: ApplyAsAgent = {
          idCardBackFileId: idCardBackFileId,
          idCardFrontFileId: idCardFrontFileId,
        };

        await UserService.applyAsAgent(model);

        navigation.goBack();
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.screen}>
      <NavigationHeader noShadowToggle={true} />

      <View style={[S.flex1, S.spaceBetween]}>
        <View>
          <View style={[S.center, S.mt20]}>
            <Insured></Insured>
            <Text style={[styles.title, S.mt20]}>Become a hero</Text>
          </View>
          <View style={[S.mt20]}>
            <Text style={[styles.subtitle, S.mt30]}>ID photo (FRONT)</Text>
            <ImageUpload
              onSelectedPhoto={(file) => {
                setIdCardFrontFile(file);
              }}
            />

            <Text style={[styles.subtitle, S.mt20]}>ID photo (BACK)</Text>
            <ImageUpload
              onSelectedPhoto={(file) => {
                setIdCardBackFile(file);
              }}
            />
          </View>
        </View>

        <View>
          <Button
            onPress={applyHero}
            disabled={!idCardFrontFile || !idCardBackFile}
            loading={isLoading}>
            Apply
          </Button>
        </View>

        <ScreenBackground>
          <BgDots2Svg style={styles.bgDots2} />
          <BgCircleSvg style={styles.bgCircle} />
        </ScreenBackground>
      </View>
      {isLoading && <LoadingIndicator></LoadingIndicator>}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    ...Screens.base,
    height: '100%',
  },
  input: {
    marginBottom: 15,
  },
  inputLast: {
    marginBottom: 0,
  },
  title: {
    ...Texts.h2,
    marginBottom: 10,
  },
  subtitle: {
    ...Texts.h3,
    marginBottom: 10,
  },
  logo: {
    position: 'absolute',
    zIndex: -5,
    top: 120,
    left: 30,
    width: 114,
  },
  bgDots2: {
    position: 'absolute',
    zIndex: -5,
    top: -20,
    left: 315,
  },
  bgCircle: {
    position: 'absolute',
    zIndex: -5,
    top: -30,
    left: 320,
  },
});
export default ApplyHeroDocuments;
