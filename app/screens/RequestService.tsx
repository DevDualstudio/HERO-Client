import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Button from '../components/Button';
import NavMenu from '../components/NavMenu';
import RoutesEnum from '../shared/RoutesEnum';
import CardBase from '../components/CardBase';
import HomeAnnouncements from '../components/HomeAnnouncements';
import ServiceTypeMenu from '../components/ServiceTypeMenu';
import PressableListItem from '../components/PressableListItem';
import FavoriteSvg from '../components/svgs/FavoriteSvg';
import Hr from '../components/Hr';
import PlacesHistory from '../components/PlacesHistory';
import HeroMapPreview from '../components/HeroMapPreview';
import WhereToAssistButtons from '../components/WhereToAssistButtons';

const RequestService = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <NavMenu navigation={navigation} />

      <ScrollView>
        <HomeAnnouncements />
        <CardBase style={styles.bottomPanel}>
          <ServiceTypeMenu style={styles.serviceTypeMenu} />
          <WhereToAssistButtons />

          <PressableListItem
            icon={<FavoriteSvg />}
            title="Favorites"
            style={styles.favorites}
          />
          <Hr />
          <PlacesHistory limit={3} style={styles.history} />
          <HeroMapPreview />
        </CardBase>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  bottomPanel: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 30,
    marginTop: -15,
    alignItems: 'flex-start',
  },
  serviceTypeMenu: {
    marginBottom: 15,
  },
  favorites: {
    marginBottom: 3,
    marginTop: 2,
  },
  history: {
    marginBottom: 25,
    marginTop: 5,
  },
});

export default RequestService;
