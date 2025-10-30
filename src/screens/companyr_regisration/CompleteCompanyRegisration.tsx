import React from 'react';
import { useWindowDimensions } from 'react-native';
import { TabView } from 'react-native-tab-view';
import FirstStepPage from './FirstSetp';
import SecondStepPage from './SecondStepPage';
import ThirdStepPage from './ThirdStepPage';
import LogoUpdate from './LogoUpdate';
import { FormProvider } from './formContext/CompanyFormContext';
import { useNavigation } from '@react-navigation/native';

const CompleteCompanyRegistration = () => {
  const layout = useWindowDimensions();
  const navigation = useNavigation();
  const steps = [
    { key: 'step1', title: 'Company Info', component: FirstStepPage },
    { key: 'step2', title: 'Primary Contact', component: SecondStepPage },
    { key: 'step3', title: 'Payment (Optional)', component: ThirdStepPage },
    { key: 'step4', title: 'Logo (Optional)', component: LogoUpdate },
  ];

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState(
    steps.map(s => ({ key: s.key, title: s.title })),
  );

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
    <FormProvider>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
    </FormProvider>
  );
};

export { CompleteCompanyRegistration };