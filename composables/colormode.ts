export function useColormode() {
  const colorMode = useColorMode();
  const toast = useToast();

  const colorModeOptions = [
    {
      preference: 'system',
      icon: 'i-ph-monitor-duotone',
    },
    {
      preference: 'dark',
      icon: 'i-ph-moon-duotone',
    },
    {
      preference: 'light',
      icon: 'i-ph-sun-duotone',
    },
  ];

  const currentColorModeIdx = computed(() => colorModeOptions.findIndex((option) => option.preference === colorMode.preference));
  const nextColorModeIdx = computed(() => (currentColorModeIdx.value + 1) % colorModeOptions.length);

  function switchColorMode() {
    colorMode.preference = colorModeOptions[nextColorModeIdx.value].preference;
    toast.add({
      title: 'Colormode changed',
      description: colorMode.preference,
      icon: colorModeOptions[currentColorModeIdx.value].icon,
    });
  }

  return {
    colorMode,
    switchColorMode,
  };
}
