import React, { useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  BackHandler,
  Platform,
  ActivityIndicator,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { WebView } from "react-native-webview";
import { StatusBar } from "expo-status-bar";
import {
  Interstitial_ID,
  RewardedInterstitial_ID,
  RewardedVidEO_ID,
  width,
} from "../contants/Constants";
import { useRoute } from "@react-navigation/native";
import * as Progress from "react-native-progress";
import {
  InterstitialAd,
  AdEventType,
  RewardedInterstitialAd,
  RewardedAdEventType,
  RewardedAd,
} from "react-native-google-mobile-ads"; 
import ConnectionStatusBackGround from "./ConnectionStatusBackGround";
import NetInfo from "@react-native-community/netinfo";
import { useNavigation } from "@react-navigation/native";

let incrementValue = 0;
let adsConter = 0;
 const interstitial = InterstitialAd.createForAdRequest(Interstitial_ID, {
  requestNonPersonalizedAdsOnly: true,
});

const rewardedInterstitial = RewardedInterstitialAd.createForAdRequest(
  RewardedInterstitial_ID,
  {
    requestNonPersonalizedAdsOnly: true,
  }
);

const rewardedAd = RewardedAd.createForAdRequest(RewardedVidEO_ID, {
  requestNonPersonalizedAdsOnly: true,
}); 
let adsTime = 15; //minute
export default function WebViewComponent() {
  const route = useRoute();
  const currentUrl = route.params.url;
  const navigation = useNavigation();
  const [canGoBack, setCanGoBack] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isLoaded, setLoaded] = useState(false);
  const [interstitialLoaded, setInterstitialLoaded] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const [rewardedInterstitialLoaded, setRewardedInterstitialLoaded] =
    useState(false);
  const [rewardedAdLoaded, setRewardedAdLoaded] = useState(false);
  const webViewRef = useRef(null);

  ///_____________________  the first implementation is using adMob api
   const loadInterstitial = () => {
    const unsubscribeLoaded = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        setInterstitialLoaded(true);
        if (adsConter == 0) {
          (async () => {
            await interstitial.show();
            adsConter = adsConter + 1;
          })();
        }
      }
    );

    const unsubscribeClosed = interstitial.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        setInterstitialLoaded(false);
        interstitial.load();
      }
    );
    interstitial.load();
    return () => {
      unsubscribeClosed();
      unsubscribeLoaded();
    };
  };

  ///=================================================
  const loadRewardedInterstitial = () => {
    const unsubscribeLoaded = rewardedInterstitial.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        setRewardedInterstitialLoaded(true);
        if (adsConter == 0) {
          (async () => {
            await rewardedInterstitial.show();
            adsConter = adsConter + 1;
          })();
        }
      }
    );

    const unsubscribeEarned = rewardedInterstitial.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      (reward) => {
        console.log("user earn : ", reward);
      }
    );

    const unsubscribeClosed = rewardedInterstitial.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        setRewardedInterstitialLoaded(false);
        rewardedInterstitial.load();
      }
    );
    rewardedInterstitial.load();

    return () => {
      unsubscribeLoaded();
      unsubscribeClosed();
      unsubscribeEarned();
    };
  };

  //===================================================
  const loadRewardedAd = () => {
    const unsubscribeLoaded = rewardedAd.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        setRewardedAdLoaded(true);
        if (adsConter == 0) {
          (async () => {
            await rewardedAd.show();
            adsConter = adsConter + 1;
          })();
        }
      }
    );

    const unsubscribeEarned = rewardedAd.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      (reward) => {
        console.log("user earn : ", reward);
      }
    );

    const unsubscribeClosed = rewardedAd.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        setRewardedAdLoaded(false);
        rewardedAd.load();
      }
    );
    rewardedAd.load();
    return () => {
      unsubscribeLoaded();
      unsubscribeClosed();
      unsubscribeEarned();
    };
  };

  useEffect(() => {
    const unsubscribeInterstitialEvents = loadInterstitial();
    const unsubscribeRewardedInterstitialEvents = loadRewardedInterstitial();
    const unsubscribeRewardedAditialEvents = loadRewardedAd();
    return () => {
      unsubscribeInterstitialEvents();
      unsubscribeRewardedInterstitialEvents();
      unsubscribeRewardedAditialEvents();
    };
  }, []);

  useEffect(() => {
    let int = setInterval(() => {
      (async () => {
        if (rewardedAdLoaded) {
          await rewardedAd.show();
        } else if (rewardedInterstitialLoaded) {
          await rewardedInterstitial.show();
        } else if (interstitialLoaded) {
          await interstitial.show();
        }
      })();
    }, adsTime * 60 * 1000);
    return () => {
      clearInterval(int);
    };
  }, []);

  ////____________________end handling adMobs__________________________________________________________

  useEffect(() => {
    incrementValue = 0;
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackPress
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []); 

  const backBtn = () => {
    Alert.alert(
      "Confirmation",
      "Would you like to cancel this section ?",
      [
        {
          text: "No",
          onPress: () => console.log("Action Non"),
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            navigation.goBack();
          },
        },
      ],
      { cancelable: false }
    );
  };
  useEffect(() => {
    incrementValue = 0;
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackPress
    );

    return () => backHandler.remove();
  }, [canGoBack]);

  const handleBackPress = () => {
    if (!canGoBack) {
      if (incrementValue >= 1) {
        // navigation?.goBack();
        backBtn();
        return true;
      } else {
        incrementValue = incrementValue + 1;
        return true;
      }
    } else {
      if (Platform.OS === "android" || Platform.OS === "ios") {
        if (webViewRef.current) {
          webViewRef.current.goBack();
          incrementValue = 0;
          return true;
        }
      }
    }
    return false;
  };

  if (!isConnected) {
    return <ConnectionStatusBackGround />;
  }

  const injectViewportScript = `
  (function() {
    var meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=yes';
    document.head.appendChild(meta);   
  })();   
`;
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={false} barStyle="dark-content" />
      <KeyboardAvoidingView
        behavior="padding"
        enabled={Platform.OS === "android"}
        contentContainerStyle={{ flex: 1 }}
        style={{
          flexGrow: 1,
          justifyContent: "flex-start",
          //  position: "relative",
        }}
      >
        <View
          style={{
            //   flex: 1,
            height: "100%",
            width: width,
          }}
        >
          {!isLoaded ? (
            <Progress.Bar
              progress={progress}
              width={width}
              borderWidth={0}
              borderRadius={0}
              color="red"
            />
          ) : null}
          <WebView
            ref={webViewRef}
            source={{ uri: currentUrl }}
            originWhitelist={["*"]}
            style={{ flex: 1 }}
            onError={(event) => console.log(event)}
            scalesPageToFit={false}
            allowFileAccess={true}
            allowFileAccessFromFileURLs={true}
            cacheEnabled={true} // to active the cache
            domStorageEnabled={true}
            allowsInlineMediaPlayback
            mediaPlaybackRequiresUserAction={false}
            /*
    userAgent="Mozilla/5.0 (Linux; Android 4.1.1; Galaxy Nexus Build/JRO03C) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Mobile Safari/535.19"
    userAgent={Platform.OS === 'android' ? 'Chrome/18.0.1025.133 Mobile Safari/535.19' : 'AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75'}
                //  userAgent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
       //  userAgent="Chrome/56.0.0.0 Mobile"   
                   userAgent={"Chrome/56.0.0.0 Mobile Safari/535.19"}

    */
            //  userAgent="Mozilla/5.0 (Linux; Android 4.1.1; Galaxy Nexus Build/JRO03C) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Mobile Safari/535.19"
            userAgent="Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.93 Mobile Safari/537.36"
            javaScriptEnabled={true}
            onLoadProgress={({ nativeEvent }) => {
              const progress = nativeEvent.progress;
              if (progress < 1 && isLoaded) {
                setLoaded(false);
              } else if (progress === 1 && !isLoaded) {
                setLoaded(true);
              }
              setProgress(progress);
            }}
            injectedJavaScript={injectViewportScript}
            onNavigationStateChange={(state) => {
              setCanGoBack(state.canGoBack);
            }}
            renderLoading={() => (
              <ActivityIndicator
                style={{
                  position: "absolute",
                  left: 0,
                  //  right: 0,
                  top: 0,
                  bottom: 0,
                  zIndex: 6,
                  // alignItems: "center",
                  // justifyContent: "center",
                }}
                size={60}
                color="red"
              />
            )}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "96.5%",
    width: "100%",
    bottom: 0,
    right: 0,
    left: 0,
    position: "absolute",
    backgroundColor: "#E6E8E9",
    justifyContent: "center",
  },
});
