using NLog;
using System;
using Newtonsoft.Json.Linq;

namespace EduApi.Services {


    // =================================================================================================
    public class EmotionalStateInterpreter {

        private Logger _logger;

        internal const int factorLow = -1;
        internal const int factorAvr = 0;
        internal const int factorHigh = 1;

        internal const double okRange = 0.3;

        public enum State { Anger, Distress, Fear, Shame, Interest, Contempt, Enjoyment, Surprise }
        private readonly int[] FrustratedStates = { (int)State.Anger, (int)State.Distress, (int)State.Fear, (int)State.Shame };
        private readonly int[] BoredStates = { (int)State.Contempt, (int)State.Surprise };
        private readonly int[] OkStates = { (int)State.Interest, (int)State.Enjoyment };

        readonly EmotionalState[] states = new[] {
            new EmotionalState(State.Anger, factorLow, factorHigh, factorHigh),
            new EmotionalState(State.Distress, factorLow, factorHigh, factorLow),
            new EmotionalState(State.Shame, factorLow, factorLow, factorLow),
            new EmotionalState(State.Fear, factorLow, factorLow, factorHigh),
            new EmotionalState(State.Interest, factorHigh, factorHigh, factorHigh),
            new EmotionalState(State.Contempt, factorHigh, factorLow, factorLow),
            new EmotionalState(State.Enjoyment, factorHigh, factorLow, factorHigh),
            new EmotionalState(State.Surprise, factorHigh, factorHigh, factorLow)
        };

        // CONSTRUCTOR
        // =============================================================================================
        #region Constructor
        public EmotionalStateInterpreter(AffitsApi affitsApi) {
            _logger = LogManager.GetCurrentClassLogger();
        }
        #endregion


        // PUBLIC
        // =============================================================================================
        public EmoState? interpret(string pad) {

            if (pad == "{\"PAD\":null}") {
                _logger.Debug("Ignored null response");

                return null;
            }
            AffitsPad affitsPad;
            try {
                affitsPad = new AffitsPad(pad);
            } catch (Exception e) {
                _logger.Error("Mapping pad: \"" + pad + "\" failed." + e.ToString());

                return null;
            }
            EmoState interpreted;
            State? stateName = null;

            if (isPeacefull(affitsPad)) {
                interpreted = EmoState.OK;
            } else {
                stateName = recognizeEmotion(affitsPad);
                if (stateName == null) {
                    return null;
                }
                interpreted = classifyState((State)stateName);
            }
            log(pad, interpreted, stateName);

            return interpreted;
        }


        // PRIVATE
        // =============================================================================================
        private EmoState classifyState(State stateName) {
            if (Array.Exists(FrustratedStates, state => state == (int)stateName)) {
                return EmoState.FRUSTRATED;
            } else if (Array.Exists(BoredStates, state => state == (int)stateName)) {
                return EmoState.BORED;
            } else {
                return EmoState.OK;
            }
        }


        // ---------------------------------------------------------------------------------------------
        private bool isPeacefull(AffitsPad pad) {
            if (
                inRange(pad.pleasure, -okRange, okRange) &&
                inRange(pad.arousal, -okRange, okRange) &&
                inRange(pad.dominance, -okRange, okRange)
            ) {
                return true;
            }
            return false;
        }


        // ---------------------------------------------------------------------------------------------
        private State recognizeEmotion(AffitsPad pad) {
            return Array.Find(states, 
                s => inRange(pad.pleasure, s.pleasure.min, s.pleasure.max) &&
                    inRange(pad.arousal, s.arousal.min, s.arousal.max) &&
                    inRange(pad.dominance, s.dominance.min, s.dominance.max)
            ).name;
        }


        // ---------------------------------------------------------------------------------------------
        private bool inRange(double value, double min, double max) {
            return min <= value && max >= value;
        }


        // ---------------------------------------------------------------------------------------------
        private void log(string pad, EmoState interpreted, State? state) {
            string stateString = (state != null ? " for interpreted emotion: " + state : "");

            _logger.Info("Classified pad data \"" + pad + "\" as: " + interpreted + stateString);
        }
    }


    // =================================================================================================
    // =================================================================================================
    public class EmotionalState {
        public EmotionalStateInterpreter.State name;
        public PadRange pleasure;
        public PadRange arousal;
        public PadRange dominance;


        // CONSTRUCTOR
        // =============================================================================================
        public EmotionalState(
            EmotionalStateInterpreter.State name,
            int pleasureExtreme,
            int arousalExtreme,
            int dominanceExtreme
        ) {
            this.name = name;
            pleasure = new PadRange(pleasureExtreme);
            arousal = new PadRange(arousalExtreme);
            dominance = new PadRange(dominanceExtreme);
        }
    }


    // =================================================================================================
    // =================================================================================================
    public class AffitsPad
    {
        public double pleasure;
        public double arousal;
        public double dominance;


        // CONSTRUCTOR
        // =============================================================================================
        public AffitsPad(string pad)
        {
            dynamic padObject = JObject.Parse(pad);
            pleasure = double.Parse(padObject.PAD.P.ToString());
            arousal = double.Parse(padObject.PAD.A.ToString());
            dominance = double.Parse(padObject.PAD.D.ToString());            
        }
    }


    // =================================================================================================
    // =================================================================================================
    public class PadRange
    {
        public int min;
        public int max;


        // CONSTRUCTOR
        // =============================================================================================
        public PadRange(int extreme) {
            if (extreme == EmotionalStateInterpreter.factorLow) {
                min = EmotionalStateInterpreter.factorLow;
                max = EmotionalStateInterpreter.factorAvr;
            } else if (extreme == EmotionalStateInterpreter.factorHigh) {
                min = EmotionalStateInterpreter.factorAvr;
                max = EmotionalStateInterpreter.factorHigh;
            } else {
                throw new NotImplementedException();
            }
        }
    }
}
