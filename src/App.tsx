import React, { useState } from 'react';
import { MobileFrame } from './components/MobileFrame';
import { StepSessionSetup } from './components/StepSessionSetup';
import { StepAiLoading } from './components/StepAiLoading';
import { StepShortlist } from './components/StepShortlist';
import { StepFinalShare } from './components/StepFinalShare';
import { EditFriendModal } from './components/EditFriendModal';
import { DnaProfileView } from './components/DnaProfileView';
import { DatabaseExplorerView } from './components/DatabaseExplorerView';
import { DEFAULT_FRIENDS } from './data/presetFriends';
import { MOCK_VENUES } from './data/mockVenues';
import { Friend, MatchScoreResult } from './types';
import { runVibeMatch } from './utils/matcher';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'session' | 'dna' | 'database'>('session');
  const [step, setStep] = useState<'setup' | 'loading' | 'shortlist' | 'winner'>('setup');
  const [city, setCity] = useState<'msk' | 'spb'>('msk');
  const [sessionTitle, setSessionTitle] = useState('Пятничный чилл с бандой');
  const [expressPrompt, setExpressPrompt] = useState('Хотим уютно поболтать и выпить вина');
  const [friends, setFriends] = useState<Friend[]>(DEFAULT_FRIENDS);
  const [editingFriend, setEditingFriend] = useState<Friend | null>(null);
  const [matchResults, setMatchResults] = useState<MatchScoreResult[]>([]);
  const [winnerResult, setWinnerResult] = useState<MatchScoreResult | null>(null);

  // Run AI matching algorithm
  const handleStartMatching = () => {
    const results = runVibeMatch(MOCK_VENUES, friends, city, expressPrompt);
    setMatchResults(results);
    setStep('loading');
  };

  const handleLoadingComplete = () => {
    setStep('shortlist');
  };

  const handleSelectFinalPlace = (winner: MatchScoreResult) => {
    setWinnerResult(winner);
    setStep('winner');
  };

  const handleResetSession = () => {
    setStep('setup');
    setWinnerResult(null);
  };

  const handleGoBack = () => {
    if (step === 'winner') {
      setStep('shortlist');
    } else if (step === 'shortlist') {
      setStep('setup');
    }
  };

  const handleEditFriend = (friend: Friend) => {
    setEditingFriend(friend);
  };

  const handleSaveFriend = (updatedFriend: Friend) => {
    setFriends((prev) =>
      prev.map((f) => (f.id === updatedFriend.id ? updatedFriend : f))
    );
  };

  const handleRemoveFriend = (friendId: string) => {
    setFriends((prev) => prev.filter((f) => f.id !== friendId));
  };

  const handleAddFriend = (newFriend: Friend) => {
    setFriends((prev) => [...prev, newFriend]);
  };

  const handleUpdateOrganizer = (updatedOrganizer: Friend) => {
    setFriends((prev) =>
      prev.map((f) => (f.isOrganizer ? updatedOrganizer : f))
    );
  };

  const organizer = friends.find((f) => f.isOrganizer) || friends[0];

  const canGoBack = activeTab === 'session' && (step === 'shortlist' || step === 'winner');

  return (
    <MobileFrame
      activeTab={activeTab}
      setActiveTab={(tab) => {
        setActiveTab(tab);
      }}
      canGoBack={canGoBack}
      onGoBack={handleGoBack}
      title={
        activeTab === 'session'
          ? 'КудаПойдем | Встреча'
          : activeTab === 'dna'
          ? 'КудаПойдем | ДНК досуга'
          : 'КудаПойдем | Каталог мест'
      }
    >
      {/* Tab: Session Core Loop */}
      {activeTab === 'session' && (
        <>
          {step === 'setup' && (
            <StepSessionSetup
              city={city}
              setCity={setCity}
              sessionTitle={sessionTitle}
              setSessionTitle={setSessionTitle}
              expressPrompt={expressPrompt}
              setExpressPrompt={setExpressPrompt}
              friends={friends}
              onEditFriend={handleEditFriend}
              onRemoveFriend={handleRemoveFriend}
              onAddFriend={handleAddFriend}
              onStartMatching={handleStartMatching}
            />
          )}

          {step === 'loading' && (
            <StepAiLoading
              friendCount={friends.length}
              cityName={city === 'msk' ? 'Москва' : 'Санкт-Петербург'}
              onComplete={handleLoadingComplete}
            />
          )}

          {step === 'shortlist' && (
            <StepShortlist
              results={matchResults}
              onSelectFinalPlace={handleSelectFinalPlace}
              onBackToEdit={() => setStep('setup')}
            />
          )}

          {step === 'winner' && winnerResult && (
            <StepFinalShare
              winner={winnerResult}
              sessionTitle={sessionTitle}
              onReset={handleResetSession}
            />
          )}
        </>
      )}

      {/* Tab: Personal DNA profile */}
      {activeTab === 'dna' && (
        <DnaProfileView
          organizer={organizer}
          onUpdateOrganizer={handleUpdateOrganizer}
        />
      )}

      {/* Tab: Database Explorer */}
      {activeTab === 'database' && <DatabaseExplorerView />}

      {/* Modal for editing any participant's DNA */}
      {editingFriend && (
        <EditFriendModal
          friend={editingFriend}
          onSave={handleSaveFriend}
          onClose={() => setEditingFriend(null)}
        />
      )}
    </MobileFrame>
  );
};
