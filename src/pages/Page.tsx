import { IonContent, IonPage } from '@ionic/react';
import { useParams } from 'react-router';

import ExploreContainer from '../components/ExploreContainer';
import './Page.css';

const Page: React.FC = () => {

  const { name } = useParams<{ name: string; }>();

  return (
    <IonPage>
      <IonContent  color='primary' fullscreen>
        <ExploreContainer name={name} />
      </IonContent>
    </IonPage>
  );
};

export default Page;
