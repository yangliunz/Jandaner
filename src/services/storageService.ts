import AsyncStorage from '@react-native-community/async-storage';
import { Destination } from '../types';

const DESTINATIONS_STORAGE_KEY = 'DESTINATIONS_STORAGE_KEY';

export async function getDestinations(): Promise<Destination[]> {
  const value = await AsyncStorage.getItem(DESTINATIONS_STORAGE_KEY);
  return value ? JSON.parse(value) : [];
}

export async function addDestination(dItem: Destination) {
  const destinations = await getDestinations();
  await AsyncStorage.setItem(
    DESTINATIONS_STORAGE_KEY,
    JSON.stringify(destinations.concat(dItem))
  );
  return dItem;
}

export async function deleteDestination(
  dItem: Destination
): Promise<Destination> {
  const destinations = await getDestinations();
  await AsyncStorage.setItem(
    DESTINATIONS_STORAGE_KEY,
    JSON.stringify(destinations.filter(item => item.id != dItem.id))
  );
  return dItem;
}
