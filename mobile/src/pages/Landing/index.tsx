import React, { useState } from "react";
import { View, Image, Text } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { RectButton } from "react-native-gesture-handler";

import iconStudy from "../../../assets/images/icons/study.png";
import iconGiveClasses from "../../../assets/images/icons/give-classes.png";
import iconHeart from "../../../assets/images/icons/heart.png";
import imageLanding from "../../../assets/images/landing.png";

import api from "../../services/api";

import styles from "./styles";

export default function Landing() {
  const [totalConnections, setTotalConnections] = useState(0);
  const { navigate } = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      api.get("connections").then(({ data }) => {
        setTotalConnections(data.total);
      });
    }, [])
  );

  const navigateToStudyRoute = () => navigate("Study");

  const navigateToTeachRoute = () => navigate("Teach");

  return (
    <View style={styles.container}>
      <Image source={imageLanding} style={styles.banner} />
      <Text style={styles.title}>
        Seja bem-vindo,{"\n"}
        <Text style={styles.titleBold}>O que deseja fazer?</Text>
      </Text>
      <View style={styles.buttonsContainer}>
        <RectButton
          style={[styles.button, styles.buttonPrimary]}
          onPress={navigateToStudyRoute}
        >
          <Image source={iconStudy} />
          <Text style={styles.buttonText}>Estudar</Text>
        </RectButton>
        <RectButton
          style={[styles.button, styles.buttonSecondary]}
          onPress={navigateToTeachRoute}
        >
          <Image source={iconGiveClasses} />
          <Text style={styles.buttonText}>Ensinar</Text>
        </RectButton>
      </View>
      <Text style={styles.totalConnections}>
        Total de {totalConnections}{" "}
        {totalConnections === 1
          ? "conexão já realizada"
          : "conexões já realizadas"}{" "}
        <Image source={iconHeart} />
      </Text>
    </View>
  );
}
