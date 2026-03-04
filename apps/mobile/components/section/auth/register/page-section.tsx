import { Router } from "expo-router";
import { ScrollView, View, Text } from "react-native";

interface RegisterSectionProps {
  ns: {
    router: Router;
  };
}
const RegisterSection: React.FC<RegisterSectionProps> = ({ ns }) => {
  return (
    <ScrollView className="relative">
      <View>
        <Text onPress={() => ns.router.back()}>Balik</Text>
      </View>
    </ScrollView>
  );
};

export default RegisterSection;
