import React, { useEffect, useState } from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { geDataByLangauges } from "../contants/Constants";
import { ScrollView } from "react-native";

const getCurrentLanguage = (lang) => {
  if (!lang) return { lang: "", title: "", languages: [], selectText: "" };
  let i;
  for (i = 0; i < geDataByLangauges().length; i++) {
    let languageProperties = geDataByLangauges()[i];
    if (languageProperties.lang.toLowerCase() == lang.toLowerCase()) {
      return {
        lang: languageProperties.lang,
        title: languageProperties.data.text,
        languages: languageProperties.data.languages,
        selectText: languageProperties.selectText,
      };
    }
  }
  return { lang: "", title: "", languages: [], selectText: "" };
};

const LanguageModal = ({
  isVisible,
  onClose = () => console.log(""),
  onSelect = () => console.log(""),
  selectedLanguage = () => console.log(""),
}) => {
  const [languagesProperties, setLanguagesProperties] = useState(
    getCurrentLanguage(selectedLanguage)
  );
  useEffect(() => {
    setLanguagesProperties(getCurrentLanguage(selectedLanguage));
  }, [selectedLanguage]);
  /*  const languages = [
    "Français",
    "Chinois mandarin",
    "Espagnol",
    "Anglais",
    "Hindi",
    "Arabe",
    "Bengali",
    "Portugais",
    "Russe",
    "Ourdou",
  ]; 
  {selectText :"Langage selectionné"
  
  }
  */
  const handleChangeLanguage = (index) => {
    const langProperties = geDataByLangauges()[index];
    setLanguagesProperties({
      lang: langProperties.lang,
      title: langProperties.data.text,
      languages: langProperties.data.languages,
      selectText: langProperties.selectText,
    });
    onSelect(langProperties.lang);
  };
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 17,
              textDecorationLine: "underline",
            }}
          >
            <View
              style={{ transform: [{ translateY: 8 }, { translateX: -8 }] }}
            >
              <MaterialIcons name="record-voice-over" size={30} color="red" />
            </View>
            {languagesProperties.title}
          </Text>
          <View style={{ marginVertical: 5 }}>
            <Text style={{ textAlign: "center" }}>
              <Text style={[styles.selectedIcon, { fontFamily: "Instrument" }]}>
                {languagesProperties.selectText} :{" "}
              </Text>
              {languagesProperties.lang}
              <Text style={[{ color: "blue" }]}>✔️</Text>
            </Text>
          </View>
          <ScrollView>
            {languagesProperties.languages.map((lang, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  handleChangeLanguage(index);
                }}
                style={[
                  styles.languageItem,
                ]}
              >
                <Text style={styles.languageText}>{lang}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: 300,
    // maxHeight: 400,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  languageItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    justifyContent: "space-between",
  },
  selectedLanguageItem: {
    backgroundColor: "#e6f7ff",
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  languageText: {
    fontSize: 16,
    marginRight: 10,
  },
  selectedIcon: {
    fontSize: 18,
    color: "red",
  },
});

export default LanguageModal;
