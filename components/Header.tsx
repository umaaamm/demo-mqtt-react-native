import { Text, TouchableOpacity, View } from "react-native";
import { IconSymbol, IconSymbolName } from "./ui/IconSymbol";

interface HeaderProps {
    onPress?: () => void;
    title?: string;
    subtitle?: string;
    icon?: IconSymbolName;
}

const renderHeader = (props?: HeaderProps) => (
    <View
        style={{
            paddingBottom: 16,
            paddingHorizontal: 16,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "white",
            borderBottomWidth: 1,
            borderColor: "#eee",
        }}
    >
        <View>
            <Text style={{ fontSize: 24, fontWeight: "bold", color: "#000" }}>{props?.title ?? "Hidroponik"}</Text>
            <Text style={{ fontSize: 14, color: "#666" }}>{props?.subtitle ?? "Data Realtime dari Hidroponik"}</Text>
        </View>
        <TouchableOpacity onPress={() => props?.onPress}>
            <IconSymbol name={props?.icon ?? "gear.circle.fill"} size={24} color="#000" />
        </TouchableOpacity>
    </View>
);


export default renderHeader;