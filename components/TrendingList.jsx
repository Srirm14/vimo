import { View, Text, FlatList } from "react-native";
import React, { useEffect } from "react";

const TrendingList = ({ data }) => {

  useEffect(()=>{
console.log(data);
  },[])
  return (
    <View className="flex flex-col gap-2 justify-center items-start px-4">
      <FlatList
        data={data}
        keyExtractor={(item)=> item.id}
        renderItem={({ item }) => (
          <View className="flex flex-row items-center gap-2">
            <Text className="text-gray-200 px-4">{data.name}</Text>
          </View>
        )}
        ListEmptyComponent={()=>(
          <Text></Text>
        )}
        horizontal
      />
    </View>
  );
};

export default TrendingList;
