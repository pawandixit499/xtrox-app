import React from 'react';
import { useWindowDimensions } from 'react-native';
import { TabView } from 'react-native-tab-view';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import PremiseDetails from './steps/PremiseDetails';

interface Step {
  key: string;
  title: string;
  component: React.ComponentType<PremiseDetailsProps>;
}

interface PremiseDetailsProps {
  navigation: NavigationProp<any>;
  currentStep: number;
  totalSteps: number;
  goToStep: React.Dispatch<React.SetStateAction<number>>;
}

const CreatePremise: React.FC = () => {
  const layout = useWindowDimensions();
  const navigation = useNavigation<NavigationProp<any>>();

  const steps: Step[] = [
    { key: 'step1', title: 'Premise Details', component: PremiseDetails },
    { key: 'step2', title: 'Primary Contact', component: PremiseDetails },
    { key: 'step3', title: 'Payment (Optional)', component: PremiseDetails },
    { key: 'step4', title: 'Logo (Optional)', component: PremiseDetails },
  ];

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState(steps.map(s => ({ key: s.key, title: s.title })));

  const renderScene = ({ route }: { route: any }) => {
    const step = steps.find(s => s.key === route.key);
    if (!step) return null;
    const StepComponent = step.component;
    return (
      <StepComponent
        navigation={navigation}
        currentStep={index}
        totalSteps={steps.length}
        goToStep={setIndex}
      />
    );
  };

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
};

export { CreatePremise };

export type { PremiseDetailsProps };
