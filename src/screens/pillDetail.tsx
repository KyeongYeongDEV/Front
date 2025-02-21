import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { useFavorites } from '../context/favorites';
import { useRoute, RouteProp } from '@react-navigation/native';

type RouteParams = {
  PillDetail: { id: string; name: string; image: string; effect: string; caution: string };
};

const PillDetailScreen = () => {
  const { toggleFavorite, favorites } = useFavorites();
  const route = useRoute<RouteProp<RouteParams, 'PillDetail'>>();
  const { id, name, image, effect, caution } = route.params;

  const isFavorite = favorites.includes(id);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>{name}</Text>
        <TouchableOpacity onPress={() => toggleFavorite(id)} style={styles.favoriteButton}>
          <Text style={[styles.favoriteIcon, isFavorite && styles.favoriteActive]}>
            ♥
          </Text>
        </TouchableOpacity>
        <Image source={{ uri: image }} style={styles.image} />
        <Text>효능: {effect}</Text>
        <Text>주의사항: {caution}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { flex: 1, padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  favoriteButton: { position: 'absolute', top: 10, right: 10 },
  favoriteIcon: { fontSize: 24, color: '#CCC' },
  favoriteActive: { color: '#FF6B6B' },
  image: { width: '100%', height: 200, marginBottom: 20 },
});

export default PillDetailScreen;