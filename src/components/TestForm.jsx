import React, { useState, useEffect } from 'react';
// import SignupForm from './SignupForm';
import MultiStepper from './MultiStepper';
import { motion } from 'framer-motion';
import i18next, { t, changeLanguage } from 'i18next';

const TestForm = () => {
  const [answers, setAnswers] = useState({
    unemployement: '',
    interest: '',
    language: '',
    diploma: '',
  });

  const [showRadioForm, setShowRadioForm] = useState(true);
  const [showMultiStepper, setShowMultiStepper] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [allRadioChecked, setAllRadioChecked] = useState(false);

  const handleAnswerChange = (name, value) => {
    setAnswers((prevAnswers) => ({ ...prevAnswers, [name]: value }));
  };

  const handleNextClick = () => {
    const allYesSelected = Object.values(answers).every((answer) => answer === 'Yes');

    if (allYesSelected) {
      setShowRadioForm(false);
      setShowMultiStepper(true);
      setShowMessage(false);
    } else {
      setShowRadioForm(false);
      setShowMultiStepper(false);
      setShowMessage(true);
    }
  };

  useEffect(() => {
    // Check if all radio buttons have been selected (with any value)
    const anyRadioUnselected = Object.values(answers).some((value) => value === '');
    setAllRadioChecked(!anyRadioUnselected);
  }, [answers]);

  return (
    <div className='md:grid md:grid-cols-2' id='pink-box'>
      <form className='p-4 md:p-18 pink-bg'>
        {showRadioForm && (
          <motion.div
            className='md:p-8'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: 'spring', duration: 1 }}
          >
            <h3 className='mb-14'>Testaa sopiiko Uraohjain-palvelu sinulle ja ilmoittaudu!</h3>
            <ol className='list-decimal ml-5'>
              <li className='my-4'>
                Oletko ilmoittautunut työttömäksi työnhakijaksi Helsingin työllisyyspalveluihin?
              </li>
              <div className='mb-8'>
                <input
                  type='radio'
                  name='unemployement'
                  className='radio bg-slate-100'
                  onChange={() => {
                    handleAnswerChange('unemployement', 'Yes');
                  }}
                />
                <span className='mx-4 font-bold'>Kyllä</span>
                <input
                  type='radio'
                  name='unemployement'
                  className='radio bg-slate-100'
                  onChange={() => {
                    handleAnswerChange('unemployement', 'No');
                  }}
                />
                <span className='mx-4 font-bold'>Ei</span>
              </div>
              <li className='my-4'>
                Onko tavoitteesi työllistyä ICT-, ohjelmistokehitys-, tai media-alalle?
              </li>
              <input
                type='radio'
                name='interest'
                className='radio bg-slate-100'
                onChange={() => {
                  handleAnswerChange('interest', 'Yes');
                }}
              />
              <span className='mx-4 font-bold'>Kyllä</span>
              <input
                type='radio'
                name='interest'
                className='radio bg-slate-100'
                onChange={() => {
                  handleAnswerChange('interest', 'No');
                }}
              />
              <span className='mx-4 font-bold'>Ei</span>

              <li className='my-4'>Onko suomen tai englannin kielen tasosi vähintään B2?</li>
              <input
                type='radio'
                name='language'
                className='radio bg-slate-100'
                onChange={() => {
                  handleAnswerChange('language', 'Yes');
                }}
              />
              <span className='mx-4 font-bold'>Kyllä</span>
              <input
                type='radio'
                name='language'
                className='radio bg-slate-100'
                onChange={() => {
                  handleAnswerChange('language', 'No');
                }}
              />
              <span className='mx-4 font-bold'>Ei</span>

              <li className='my-4'>Onko sinulla toisen tai korkea-asteen tutkinto?</li>
              <input
                type='radio'
                name='diploma'
                className='radio bg-slate-100'
                onChange={() => {
                  handleAnswerChange('diploma', 'Yes');
                }}
              />
              <span className='mx-4 font-bold'>Kyllä</span>
              <input
                type='radio'
                name='diploma'
                className='radio bg-slate-100'
                onChange={() => {
                  handleAnswerChange('diploma', 'No');
                }}
              />
              <span className='mx-4 font-bold'>Ei</span>
            </ol>
            <div className='flex justify-end mt-10 md:mt-4'>
              <button
                className={`btn btn-lg btn-outline btn-form w-40 ${
                  allRadioChecked ? '' : 'cursor-not-allowed opacity-80'
                }`}
                onClick={handleNextClick}
                disabled={!allRadioChecked}
              >
                Seuraava
              </button>
            </div>
          </motion.div>
        )}

        {showMessage && (
          <motion.div
            className='flex flex-col items-center py-28 md:px-8 md:py-24'
            initial={{ opacity: 0, translateX: 100 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ type: 'spring', stiffness: 80, duration: 0.5 }}
          >
            <h3 className=''>Kiitos mielenkiinnostasi!</h3>
            <p className=''>
              Valitettavasti Uraohjain-palvelun osallistumiskriteerit eivät täyty kohdallasi. Voit
              olla yhteydessä{' '}
              <a href='https://stadinao.fi/palvelut-tyollistymiseen-ja-opintoihin/'>
                Stadin Ammatti- ja aikuisopiston ura- ja opinto-ohjauspalveluihin
              </a>
              tai vierailla
              <a href='https://tyollisyyspalvelut.hel.fi/yhteystiedot/neuvonta'>
                Helsingin työllisyyspalveluiden neuvontapisteillä
              </a>
              sopivan palvelun löytämiseksi. <br />
              <br />
              Opintoihin liittyen voit kysyä ohjausta
              <a href='https://www.laurea.fi/tyoelamapalvelut/palveluteot/avoin-amk-ohjauspalvelut/'>
                Laurea-ammattikorkeakoulun avoimen AMK:n ohjauspalveluista
              </a>
              tai
              <a href='https://www.metropolia.fi/fi/opiskelu-metropoliassa/yleista-tietoa-opiskelusta/opiskelijapalvelut'>
                Metropolia Ammattikorkeakoulun ohjauspalveluista
              </a>
            </p>
          </motion.div>
        )}

        {showMultiStepper && (
          <motion.div
            initial={{ opacity: 0, translateX: 20 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ type: 'spring', stiffness: 50, duration: 2 }}
          >
            <MultiStepper />
          </motion.div>
        )}
      </form>
      <img
        src='/img/register/walking-man.jpg'
        alt=''
        className='hidden md:block bg-cover w-full h-full'
      />
    </div>
  );
};

export default TestForm;
