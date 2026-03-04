import RegisterSection from "@/components/section/auth/register/page-section";
import { useAppNameSpace } from "@/hooks/costum/namespace";
import { View } from "react-native";

const RegisterContainer = () => {
  const ns = useAppNameSpace();
  return (
    <View className="w-full min-h-screen">
      <RegisterSection
        ns={{
          router: ns.router,
        }}
      />
    </View>
  );
};

export default RegisterContainer;
