import React, { useEffect } from 'react';
import EnterIcon from '../../assets/images/onboardingassets/Icons/Enter';
import Spinner from '@/_ui/Spinner';

function ContinueButton({ setPage, formData, page, setCompleted, isLoading, setIsLoading, darkMode }) {
  const activeCondition =
    isLoading ||
    (page == 0 && !formData.companyName) ||
    (page == 0 && formData.companyName.trim().length === 0) ||
    (page == 1 && !formData.role) ||
    (page == 2 && !formData.companySize);

  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === 'Enter' && !activeCondition) {
        setPage((currPage) => currPage + 1);
        if (page == 2) {
          setIsLoading(true);
          setCompleted(true);
        }
      }
    };
    document.addEventListener('keydown', keyDownHandler);
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, formData, activeCondition]);

  return (
    <button
      className="onboarding-page-continue-button"
      disabled={activeCondition}
      onClick={(e) => {
        e.preventDefault();
        setPage((currPage) => currPage + 1);
        if (page == 2) {
          setIsLoading(true);
          setCompleted(true);
        }
      }}
    >
      {isLoading ? (
        <div className="spinner-center">
          <Spinner />
        </div>
      ) : (
        <>
          <p className="mb-0">Continue</p>
          <EnterIcon
            className="enter-icon-onboard"
            fill={Object.values(formData)[page] == '' || isLoading ? (darkMode ? '#656565' : ' #D1D5DB') : '#fff'}
          />
        </>
      )}
    </button>
  );
}

export default ContinueButton;
