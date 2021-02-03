import React, { Component, createContext } from "react";

export const appContext = createContext();

class appProvider extends Component {
  constructor(props) {
    super(props);
    /**
     * state
     */
    this.state = {
      player: {
        /**
         * Audio Context
         */
        threadInUse: "worker", // 'main' or 'worker'
        audioContext: null,
        analyser: null,
        gainNode: null,
        currentSource: null,
        bufferLength: null,
        duration: 0,

        musicIndex: 0,
        playing: false,
        javascriptNode: null,
        firstPlay: true,
        audioContextCreatedTime: 0,
        audioLoadOffsetTime: 0,
        audioCurrentTime: 0,
        updatedVolume: false,
        isLoadingSong: false,
        isLoadingFullSong: false,
        canLoadFullSong: true,
        playingFullMusic: false,
        audioStreamData: null,
        trackerEnabled: false, // @NOTE: tracker disabled until solve the thing of re-read stream data and not re-set the position of tracker

        /**
         * Canvas Context
         */
        canvas: null,
        canvasContext: null,
        canvasWidth: null,
        canvasHeight: null,
        canvasScaleCoef: null,
        canvasCx: null,
        canvasCy: null,
        canvasCoord: null,
        canvasFirstDraw: true,
        canvasResized: false,

        /**
         * Framer Context
         */
        framerTransformScale: false,
        framerCountTicks: 360,
        framerFrequencyData: [],
        framerTickSize: 10,
        framerPI: 360,
        framerIndex: 0,
        framerLoadingAngle: 0,
        framerMaxTickSize: null,
        framerTicks: null,

        /**
         * Scene Context
         */
        scenePadding: 120,
        sceneMinSize: 740,
        sceneOptimiseHeight: 982,
        sceneInProcess: false,
        sceneRadius: 250,

        /**
         * Tracker Context
         */
        trackerInnerDelta: 20,
        trackerLineWidth: 7,
        trackerPrevAngle: 0.5,
        trackerAngle: 0,
        trackerAnimationCount: 10,
        trackerPressButton: false,
        trackerAnimatedInProgress: false,
        trackerAnimateId: null,
        trackerR: 226.5,

        /**
         * Controls Context
         */
        timeControl: {
          textContent: "00:00",
        },

        /**
         * Misc
         */
        initialFixedTicks: false,
        hasStreamSupport: !!window.fetch && !!window.ReadableStream,
      },
    };

    /**
     * functions
     */
    this.myFunction = this.myFunction.bind(this);
  }

  myFunction() {}

  /**
   * React Render
   */
  render() {
    return (
      <appContext.Provider
        value={{
          /**
           * Player
           */
          player: this.state.player,
        }}
      >
        {this.props.children}
      </appContext.Provider>
    );
  }
}

export default appProvider;
