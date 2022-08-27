import { useState, useEffect, useCallback } from "react";
import { Preferences } from "@capacitor/preferences";

export function usePreferences() {
  const get = useCallback(async (key) => {
    const v = await Preferences.get({ key });
    if (v) {
      return v.value;
    }
    return null;
  }, []);

  const set = useCallback((key, value) => {
    return Preferences.set({ key, value });
  }, []);

  const remove = useCallback((key) => {
    return Preferences.remove({ key });
  }, []);

  const getKeys = useCallback(() => {
    return Preferences.keys();
  }, []);

  const clear = useCallback(() => {
    return Preferences.clear();
  }, []);

  return { get, set, remove, getKeys, clear };
}

export function usePreferencesItem(key, initialValue) {
  const [storedValue, setStoredValue] = useState("");

  useEffect(() => {
    async function loadValue() {
      try {
        const result = await Preferences.get({ key });
        // eslint-disable-next-line
        if (result.value == undefined && initialValue != undefined) {
          result.value =
            typeof initialValue === "string"
              ? initialValue
              : JSON.stringify(initialValue);
          setValue(result.value);
        } else {
          if (result.value) {
            setStoredValue(
              typeof result.value === "string"
                ? result.value
                : JSON.parse(result.value)
            );
          } else {
            setStoredValue(undefined);
          }
        }
      } catch (e) {
        return initialValue;
      }
    }
    loadValue();
    // eslint-disable-next-line
  }, [setStoredValue, initialValue, key]);

  const setValue = async (value) => {
    try {
      setStoredValue(value);
      await Preferences.set({
        key,
        value: typeof value === "string" ? value : JSON.stringify(value),
      });
    } catch (e) {
      console.error(e);
    }
  };

  return [storedValue, setValue];
}
