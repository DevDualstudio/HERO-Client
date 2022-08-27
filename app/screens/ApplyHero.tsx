import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Screens, Texts, S, Colors } from '../styles';
import { useNavigation } from '@react-navigation/native';
import RoutesEnum from '../shared/RoutesEnum';
import NavigationHeader from '../components/NavigationHeader';
import ScreenBackground from '../components/ScreenBackground';
import BgDots2Svg from '../components/svgs/BgDots2Svg';
import BgCircleSvg from '../components/svgs/BgCircleSvg';
import { File } from '../shared/File';
import UserService from '../services/UserService';
import LoadingIndicator from '../components/LoadingIndicator';
import Insured from '../components/svgs/InsuredSvg';
import Popover from 'react-native-popover-view';
import HelpSvg from '../components/svgs/HelpSvg';
import IdCardSvg from '../components/svgs/IdCardSvg';
import TickActiveSvg from '../components/svgs/TickActiveSvg';
import TickInactiveSvg from '../components/svgs/TickInactiveSvg';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ApplyAgentStatus } from '../types/ApplyAsAgentStatus';

const ApplyHero = (): JSX.Element => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDocumentSubmitted, setIsDocumentSubmitted] = useState<boolean>(true);
  const [isFormComplete, setIsFormComplete] = useState<boolean>(true);
  const [
    isLegalBackgroundCheckDone,
    setIsLegalBackgroundCheckDone,
  ] = useState<boolean>(true);
  const [
    isMedicalExaminationDone,
    setIsMedicalExaminationDone,
  ] = useState<boolean>(true);
  const [isProfileAnalysisDone, setIsProfileAnalysisDone] = useState<boolean>(
    true,
  );

  const touchableDoc = useRef();
  const [showPopoverDoc, setShowPopoverDoc] = useState(false);

  const touchableForm = useRef();
  const [showPopoverForm, setShowPopoverForm] = useState(false);

  const touchableBack = useRef();
  const [showPopoverBack, setShowPopoverBack] = useState(false);

  const touchableMed = useRef();
  const [showPopoverMed, setShowPopoverMed] = useState(false);

  const touchableNet = useRef();
  const [showPopoverNet, setShowPopoverNet] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      checkApplyStatus();
    });
    return unsubscribe;
  }, [navigation]);

  const checkApplyStatus = async () => {
    try {
      setIsLoading(true);
      const response: ApplyAgentStatus = await UserService.getApplyStatus();
      setIsDocumentSubmitted(response.isIdUploaded);
      setIsFormComplete(response.isFormComplete);
      setIsLegalBackgroundCheckDone(response.isLegalBackgroundCheckDone);
      setIsMedicalExaminationDone(response.isMedicalExaminationDone);
      setIsProfileAnalysisDone(response.isProfileAnalysisDone);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.screen}>
      <NavigationHeader noShadowToggle={true} />
      <View style={[S.flex1]}>
        <View>
          <View style={[S.mt60]}>
            <Insured></Insured>
            <Text style={[styles.title, S.mt20]}>Become a hero</Text>
            <Text style={styles.description}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley.
            </Text>
          </View>

          {!isDocumentSubmitted && (
            <View style={[S.mt30]}>
              <Pressable
                onPress={() => {
                  navigation.navigate(RoutesEnum.SUBMIT_HERO_DOCUMENTS);
                }}>
                <View
                  style={[
                    S.p10,
                    S.pt20,
                    S.pb20,
                    S.row,
                    S.centerX,
                    S.spaceAround,
                    styles.submitPhotoContainer,
                  ]}>
                  <IdCardSvg></IdCardSvg>
                  <Text>Submit a photo of your ID or Driver's license</Text>
                </View>
              </Pressable>
            </View>
          )}
        </View>

        <View style={[S.row, S.mt40, S.pr20, S.centerX]}>
          {isDocumentSubmitted ? (
            <TickActiveSvg></TickActiveSvg>
          ) : (
            <TickInactiveSvg></TickInactiveSvg>
          )}
          <Text style={[S.ml10, S.mr10]}>
            Submit a photo of your ID or Driver's license
          </Text>
          <Pressable
            onPress={() => setShowPopoverDoc(true)}
            ref={touchableDoc}
            style={{ position: 'absolute', right: 10 }}>
            <HelpSvg></HelpSvg>
          </Pressable>
          <Popover
            from={touchableDoc}
            isVisible={showPopoverDoc}
            onRequestClose={() => setShowPopoverDoc(false)}>
            <View style={[S.p20]}>
              <Text>
                Doc Lorem Ipsum is simply dummy text of the printing and
                typesetting
              </Text>
            </View>
          </Popover>
        </View>

        <View style={[S.row, S.mt30, S.pr20, S.centerX]}>
          {isFormComplete ? (
            <TickActiveSvg></TickActiveSvg>
          ) : (
            <TickInactiveSvg></TickInactiveSvg>
          )}
          <Text style={[S.ml10, S.mr10]}>
            Complete the form sent through the email of the bonfire security
            agency
          </Text>
          <Pressable
            onPress={() => setShowPopoverForm(true)}
            ref={touchableForm}
            style={{ position: 'absolute', right: 10 }}>
            <HelpSvg></HelpSvg>
          </Pressable>
          <Popover
            from={touchableForm}
            isVisible={showPopoverForm}
            onRequestClose={() => setShowPopoverForm(false)}>
            <View style={[S.p20]}>
              <Text>
                Form Lorem Ipsum is simply dummy text of the printing and
                typesetting
              </Text>
            </View>
          </Popover>
        </View>

        <View style={[S.row, S.mt30, S.pr20, S.centerX]}>
          {isLegalBackgroundCheckDone ? (
            <TickActiveSvg></TickActiveSvg>
          ) : (
            <TickInactiveSvg></TickInactiveSvg>
          )}
          <Text style={[S.ml10, S.mr10]}>Legal background check</Text>
          <Pressable
            onPress={() => setShowPopoverBack(true)}
            ref={touchableBack}
            style={{ position: 'absolute', right: 10 }}>
            <HelpSvg></HelpSvg>
          </Pressable>
          <Popover
            from={touchableBack}
            isVisible={showPopoverBack}
            onRequestClose={() => setShowPopoverBack(false)}>
            <View style={[S.p20]}>
              <Text>
                Back Lorem Ipsum is simply dummy text of the printing and
                typesetting
              </Text>
            </View>
          </Popover>
        </View>

        <View style={[S.row, S.mt30, S.pr20, S.centerX]}>
          {isMedicalExaminationDone ? (
            <TickActiveSvg></TickActiveSvg>
          ) : (
            <TickInactiveSvg></TickInactiveSvg>
          )}
          <Text style={[S.ml10, S.mr10]}>Medical examination</Text>
          <Pressable
            onPress={() => setShowPopoverMed(true)}
            ref={touchableMed}
            style={{ position: 'absolute', right: 10 }}>
            <HelpSvg></HelpSvg>
          </Pressable>
          <Popover
            from={touchableMed}
            isVisible={showPopoverMed}
            onRequestClose={() => setShowPopoverMed(false)}>
            <View style={[S.p20]}>
              <Text>
                Med Lorem Ipsum is simply dummy text of the printing and
                typesetting
              </Text>
            </View>
          </Popover>
        </View>

        <View style={[S.row, S.mt30, S.pr20, S.centerX]}>
          {isProfileAnalysisDone ? (
            <TickActiveSvg></TickActiveSvg>
          ) : (
            <TickInactiveSvg></TickInactiveSvg>
          )}
          <Text style={[S.ml10, S.mr10]}>
            Review and analyze your profile on the net
          </Text>
          <Pressable
            onPress={() => setShowPopoverNet(true)}
            ref={touchableNet}
            style={{ position: 'absolute', right: 10 }}>
            <HelpSvg></HelpSvg>
          </Pressable>
          <Popover
            from={touchableNet}
            isVisible={showPopoverNet}
            onRequestClose={() => setShowPopoverNet(false)}>
            <View style={[S.p20]}>
              <Text>
                Net Lorem Ipsum is simply dummy text of the printing and
                typesetting
              </Text>
            </View>
          </Popover>
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
    top: 70,
    left: 215,
  },
  bgCircle: {
    position: 'absolute',
    zIndex: -5,
    top: -120,
    left: 250,
  },
  description: {
    ...Texts.psmall,
  },
  submitPhotoContainer: {
    backgroundColor: '#F5F5FF',
    borderWidth: 1,
    borderColor: Colors.lightHeroic,
    borderRadius: 10,
  },
});
export default ApplyHero;
