// import React from "react";
// import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
// import {
//   Ionicons,
//   AntDesign,
//   SimpleLineIcons,
//   MaterialCommunityIcons,
//   MaterialIcons,
// } from "@expo/vector-icons";

// const Sidebar = () => {
//   return (
//     <View style={styles.container}>
//       <View>
//         <Ionicons
//           name="ios-person-circle-outline"
//           size={30}
//           color="#355E3B"
//           marginLeft={15}
//         />
//       </View>
//       <View style={{ marginTop: 10, marginLeft: 15 }}>
//         <Text
//           style={{
//             fontSize: 20,
//             fontWeight: "700",
//             color: "#355E3B",
//             marginBottom: 20,
//           }}
//         >
//           Raheel Mubarik
//         </Text>
//       </View>
//       <View style={styles.divider} />

//       {/* Menu Items */}
//       <View style={{ paddingTop: 70 }}>
//         <TouchableOpacity style={styles.menuItem}>
//           <Ionicons name="ios-person-circle-outline" size={22} color="black" />
//           <Text style={styles.menuText}>View Profile</Text>
//         </TouchableOpacity>
//         <View style={styles.divider} />
//         <TouchableOpacity style={styles.menuItem}>
//           <SimpleLineIcons name="directions" size={22} color="black" />
//           <Text style={styles.menuText}>Addresses</Text>
//         </TouchableOpacity>
//         <View style={styles.divider} />
//         <TouchableOpacity style={styles.menuItem}>
//           <MaterialCommunityIcons
//             name="tag-arrow-down-outline"
//             size={22}
//             color="black"
//           />
//           <Text style={styles.menuText}>Vouchers & Offer</Text>
//         </TouchableOpacity>
//         <View style={styles.divider} />
//         <TouchableOpacity style={styles.menuItem}>
//           <Ionicons name="repeat" size={22} color="black" />
//           <Text style={styles.menuText}>Order & Re-Ordering</Text>
//         </TouchableOpacity>
//         <View style={styles.divider} />
//         <TouchableOpacity style={styles.menuItem}>
//           <Ionicons name="help-buoy-outline" size={22} color="black" />
//           <Text style={styles.menuText}>Help Center</Text>
//         </TouchableOpacity>
//         <View style={styles.divider} />
//         <TouchableOpacity style={styles.menuItem}>
//           <AntDesign name="gift" size={22} color="black" />
//           <Text style={styles.menuText}>Invited Friends</Text>
//         </TouchableOpacity>
//         <View style={styles.divider} />
//         <TouchableOpacity style={styles.menuItem}>
//           <AntDesign name="setting" size={22} color="black" />
//           <Text style={styles.menuText}>Setting</Text>
//         </TouchableOpacity>
//       </View>
//       <View style={{ paddingTop: 80 }}>
//         <View style={styles.divider} />
//         <View style={styles.menuItem}>
//           <MaterialIcons name="logout" size={24} color="#355E3B" />
//           <TouchableOpacity>
//             <Text
//               style={{
//                 fontSize: 18,
//                 fontWeight: "700",
//                 color: "#355E3B",
//                 marginLeft: 20,
//               }}
//             >
//               LogOut
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "white",
//     borderTopRightRadius: 35,
//     borderBottomRightRadius: 35,
//     paddingTop: 60,
//     borderRadius: 10,
//     // marginTop: 50,
//     width: "80%",
//   },
//   divider: {
//     borderBottomColor: "black",
//     borderBottomWidth: 1,
//     marginVertical: 10,
//   },
//   menuItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginVertical: 15,
//     marginLeft: 18,
//   },
//   menuText: {
//     marginLeft: 20,
//     fontSize: 16,
//     fontWeight: "400",
//   },
// });

// export default Sidebar;
