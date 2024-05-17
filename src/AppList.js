import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  BANNER_ID,
  BANNER_ID_2,
  getDefaultLanguage,
  getObjectData,
  handleData,
  width,
} from "../contants/Constants";
import { useNavigation } from "@react-navigation/native";
import LanguageModal from "./LanguageModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";
import * as Localization from "expo-localization";
import NetInfo from "@react-native-community/netinfo";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  BannerAd,
  BannerAdSize
} from "react-native-google-mobile-ads"; 

const LANG_STORAGE_KEY = "@selectedLanguage";

const AppList = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [componentMustBeReRend, setComponentMustBeReRend] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(
    getDefaultLanguage(Localization?.locale).languageName
  );
  const [serviceData, setServiceData] = useState(handleData(selectedLanguage));
  useEffect(() => {
    const loadSelectedLanguage = async () => {
      try {
        const storedLanguage = await AsyncStorage.getItem(LANG_STORAGE_KEY);
        if (storedLanguage !== null) {
          setSelectedLanguage(storedLanguage);
          setServiceData(handleData(storedLanguage));
        } else {
          if (
            !getDefaultLanguage(Localization?.locale).thereIsDefaultLanguage
          ) {
            setModalVisible(true);
          }
        }
      } catch (error) {
        console.error(
          "Erreur lors du chargement de la langue sélectionnée :",
          error
        );
      }
    };

    loadSelectedLanguage();
  }, []);
  useEffect(() => {
    // this line of code permit to fetch ads after connection state pass to false on true
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (state.isConnected) {
        setComponentMustBeReRend(!componentMustBeReRend);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    setServiceData(handleData(selectedLanguage));
  }, [selectedLanguage]);
  useEffect(() => {
    if (!serviceData || serviceData.length < 1) return;
    try {
      const filteredData = serviceData.filter((item) => {
        const queryTest = searchQuery.toLowerCase().trim().split(" "); // Diviser la chaîne de recherche en mots
        const matchConcernPersons = queryTest.filter((word) =>
          item.concernPersons.toLowerCase().includes(word.toLowerCase())
        );
        const matchValues = queryTest.filter((word) => {
          let res = item.values.filter((value) =>
            value.name.toLowerCase().includes(word.toLowerCase().trim())
          );
          return res.length > 0;
        });

        return matchConcernPersons.length > 0 || matchValues.length > 0;
      });

      if (searchQuery.length < 1) {
        setServiceData(handleData(selectedLanguage));
      } else {
        if (filteredData && filteredData.length > 0) {
          setServiceData(filteredData);
        } else {
          setServiceData(handleData(selectedLanguage));
        }
      }
    } catch (error) {
      console.log("error : ", error);
      setServiceData(handleData(selectedLanguage));
    }
  }, [searchQuery]);

  const handleLanguageSelect = async (language) => {
    setSelectedLanguage(language);
    // setModalVisible(false);
    try {
      await AsyncStorage.setItem(LANG_STORAGE_KEY, language);
    } catch (error) {
      console.error(
        "Erreur lors de l'enregistrement de la langue sélectionnée :",
        error
      );
    }
  };

  const renderItem = ({ item }) => {
    const containWidth = width * 0.85;
    return (
      <View
        style={{
          width: containWidth,
          // marginLeft: (width - containWidth) / 2,
          backgroundColor: "white",
          padding: 10,
          //  height:600,
        }}
      >
        <View>
          <Text
            style={{
              fontSize: 18,
              fontFamily: "Instrument",
              paddingHorizontal: 15,
              // marginVertical: 15,
              marginTop: -5,
              marginBottom: 15,
              textAlign: "center",
              textDecorationLine: "underline",
            }}
          >
            {item.concernPersons}
          </Text>
        </View>
        <FlatList
          data={item?.values}
          renderItem={({ item: value, index }) => (
            <TouchableOpacity
              style={[
                styles.serviceContainer,
                item.values.length === 1 && styles.centeredServiceContainer, // Ajoutez cette ligne
              ]}
              onPress={() =>
                navigation.navigate("WebViewScreen", { url: value.url })
              }
              key={index}
            >
              <View style={styles.serviceIconContainer}>
                <Image
                  source={value.logo}
                  style={
                    (item.id === 1 && !(index === 2 || index === 3)) ||
                    item.id === 2
                      ? styles.serviceIcon
                      : styles.serviceIcon2
                  }
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.serviceName}>{value.name}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          contentContainerStyle={{
            alignContent: "center",
            justifyContent: "center",
          }}
        />
      </View>
    );
  };

  /*  const AdComponent = () => (
  <View style={{ alignItems: 'center', justifyContent: 'center', padding: 20 }}>
    <AdMobBanner
      bannerSize="banner"
      adUnitID="YOUR_AD_UNIT_ID"
      servePersonalizedAds // true or false
      onDidFailToReceiveAdWithError={(error) => console.error(error)}
    />
  </View>
);
const renderSeparator = () => (
  <View style={{ height: 50 }}>
        <Text>Salut la mifa</Text>
  </View>
);
 */
  const renderSeparator = (index) => {
    return index.leadingItem.id === 1 || index.leadingItem.id === 4 ? (
      <View
        style={[
          {
            alignItems: "center",
            justifyContent: "center",
            maxHeight: 200,
          },
        ]}
      >
        <BannerAd
          unitId={BANNER_ID}
          adUnitID={BANNER_ID}
          size={BannerAdSize.LARGE_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        />  
      </View>
    ) : (
      <></>
    );
  };
  const MyListFooter = () => (
    <View style={styles.footerContainer}>
    <BannerAd
        unitId={BANNER_ID_2}
        size={BannerAdSize.LARGE_BANNER}
                  adUnitID={BANNER_ID_2}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      /> 
    </View>
  );
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={false} barStyle="dark-content" />
      <View style={styles.container2}>
        <LanguageModal
          isVisible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSelect={handleLanguageSelect}
          selectedLanguage={selectedLanguage}
        />
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={{ marginTop: 4, zIndex: 2 }}
          >
            <MaterialIcons name="menu" size={33} color={"black"} />
          </TouchableOpacity>

          <Text style={styles.trustText}>
            <View style={styles.text}>
              <Text>
                <Text style={styles.firstLetter}>
                  {getObjectData(selectedLanguage)?.data?.firstWord.charAt(0)}
                </Text>
                <Text style={styles.secondLetters}>
                  {getObjectData(selectedLanguage)?.data?.firstWord.slice(1)}
                </Text>
              </Text>
            </View>
            <View style={styles.text}>
              <Text>
                &
                <Text style={styles.firstLetter}>
                  {getObjectData(selectedLanguage)?.data?.secondWord.charAt(0)}
                </Text>
                <Text style={styles.secondLetters}>
                  {getObjectData(selectedLanguage)?.data?.secondWord.slice(1)}
                </Text>
              </Text>
            </View>
            <View style={styles.text}>
              <Text>
                &
                <Text style={styles.firstLetter}>
                  {getObjectData(selectedLanguage)?.data?.thirdWord.charAt(0)}
                </Text>
                <Text style={styles.secondLetters}>
                  {getObjectData(selectedLanguage)?.data?.thirdWord.slice(1)}
                </Text>
              </Text>
            </View>
          </Text>
        </View>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder={getObjectData(selectedLanguage)?.data?.queryText}
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />
        </View>
        <View
          style={{
            padding: 15,
            borderRadius: 15,
            backgroundColor: "white",
            marginBottom: 100,
          }}
        >
          <FlatList
            data={serviceData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{
              alignItems: "center",
              justifyContent: "center",
              marginTop: 20,
            }}
            ItemSeparatorComponent={renderSeparator}
            ListFooterComponent={<MyListFooter />}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E6E8E9", //#91918E
    justifyContent: "center",
  },
  container2: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    backgroundColor: "#ccc",
  },
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
    width: width * 0.85,
  },
  text: {
    paddingRight: 10,
  },
  firstLetter: {
    fontSize: 26,
    fontWeight: "bold",
  },
  secondLetters: {
    fontSize: 19,
    fontFamily: "Instrument",
  },
  searchContainer: {
    width: "100%",
    marginBottom: 5,
  },
  searchInput: {
    height: 40,
    borderColor: "white",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  logo: {
    width: 50,
    height: 50,
  },
  centeredServiceContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  trustText: {
    fontSize: 16,
    marginBottom: 20,
  },
  searchInput: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: "white",
  },
  appContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  serviceIconContainer: {
    width: width * 0.35,
    height: width * 0.35,
    borderRadius: 10,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  serviceIcon: {
    width: "22%",
    height: "22%",
  },
  serviceIcon2: { width: "65%", height: "65%" },
  serviceContainer: {
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 5,
    marginRight: 10,
  },
  serviceName: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  appLogo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  appName: {
    fontSize: 16,
  },
  footerContainer: {
    alignItems: "center",
    padding: 20,
  },
  footerText: {
    fontSize: 14,
    color: "#555",
  },
});

export default AppList;
