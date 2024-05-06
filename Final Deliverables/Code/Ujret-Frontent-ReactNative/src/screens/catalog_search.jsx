import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Colors, ColorsLight} from '../themes/colors';

const ToolCard = ({navigation}) => {
  const toolData = {
    title: 'Hammer',
    category: 'Hand Tool',
    rentPerDay: '5',
    availableBy: 'Tomorrow',
    description:
      'This is a durable hammer suitable for all types of carpentry work.',
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('AddToolScreen')}
          style={styles.button}>
          <Text style={styles.buttonText}>Add Tool</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('MyToolsScreen')}
          style={styles.button}>
          <Text style={styles.buttonText}>My Tools</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Image
          source={{
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCj8cWAYosX0qg_RBtkJeDDG2bRskXiqG5dIi7X71Dhg&s',
          }}
          style={styles.image}
        />
        <View style={styles.detailRow}>
          <Text style={styles.label}>Title:</Text>
          <Text style={styles.value}>{toolData.title}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Category:</Text>
          <Text style={styles.value}>{toolData.category}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Rent/Day:</Text>
          <Text style={styles.value}>${toolData.rentPerDay}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Available by:</Text>
          <Text style={styles.value}>{toolData.availableBy}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Tool descriptions:</Text>
          <Text style={styles.value}>{toolData.description}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.background,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: Colors.primaryColor,
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: Colors.background,
    fontWeight: 'bold',
  },
  card: {
    width: '100%',
    borderColor: Colors.borderColor,
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    backgroundColor: ColorsLight.primaryWhite,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 4,
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  label: {
    fontSize: 14,
    color: Colors.secondaryColor,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 14,
    color: Colors.primaryBlack,
  },
});

export default ToolCard;

// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
//   ScrollView,
// } from 'react-native';
// import {Colors, ColorsLight} from '../themes/colors';
// import {fetchAvailableTools} from '../api_layer/tasks_apis';

// const ToolCard = ({navigation}) => {
//   const [toolData, setToolData] = useState([]);

//   // Fetch tool data from backend
//   useEffect(() => {
//     fetchTools();
//   }, []);

//   const fetchTools = async () => {
//     try {
//       const data = await fetchAvailableTools();
//       setToolData(data);
//     } catch (error) {
//       console.error('Failed to fetch tools:', error);
//       alert('Failed to fetch tools.');
//     }
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.buttonContainer}>
//         <TouchableOpacity
//           onPress={() => navigation.navigate('AddToolScreen')}
//           style={styles.button}>
//           <Text style={styles.buttonText}>Add Tool</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           onPress={() => navigation.navigate('MyToolsScreen')}
//           style={styles.button}>
//           <Text style={styles.buttonText}>My Tools</Text>
//         </TouchableOpacity>
//       </View>
//       {toolData.map((tool, index) => (
//         <View key={index} style={styles.card}>
//           <Image
//             source={{uri: tool.image || 'https://via.placeholder.com/150'}}
//             style={styles.image}
//           />
//           <View style={styles.detailRow}>
//             <Text style={styles.label}>Title:</Text>
//             <Text style={styles.value}>{tool.title}</Text>
//           </View>
//           <View style={styles.detailRow}>
//             <Text style={styles.label}>Category:</Text>
//             <Text style={styles.value}>{tool.category}</Text>
//           </View>
//           <View style={styles.detailRow}>
//             <Text style={styles.label}>Rent/Day:</Text>
//             <Text style={styles.value}>${tool.rentPerDay}</Text>
//           </View>
//           <View style={styles.detailRow}>
//             <Text style={styles.label}>Available by:</Text>
//             <Text style={styles.value}>{tool.availableBy}</Text>
//           </View>
//           <View style={styles.detailRow}>
//             <Text style={styles.label}>Tool descriptions:</Text>
//             <Text style={styles.value}>{tool.description}</Text>
//           </View>
//         </View>
//       ))}
//       <TouchableOpacity onPress={fetchTools} style={styles.button}>
//         <Text style={styles.buttonText}>Refresh</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: Colors.background,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 20,
//   },
//   button: {
//     backgroundColor: Colors.primaryColor,
//     padding: 10,
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: Colors.background,
//     fontWeight: 'bold',
//     alignSelf: 'center',
//   },
//   card: {
//     width: '100%',
//     borderColor: Colors.borderColor,
//     borderWidth: 1,
//     borderRadius: 8,
//     padding: 16,
//     backgroundColor: ColorsLight.primaryWhite,
//     marginBottom: 10,
//   },
//   image: {
//     width: '100%',
//     height: 150,
//     borderRadius: 4,
//     marginBottom: 10,
//   },
//   detailRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 5,
//   },
//   label: {
//     fontSize: 14,
//     color: Colors.secondaryColor,
//     fontWeight: 'bold',
//   },
//   value: {
//     fontSize: 14,
//     color: Colors.primaryBlack,
//     flexShrink: 1, // Ensure text does not overflow
//   },
// });

// export default ToolCard;
