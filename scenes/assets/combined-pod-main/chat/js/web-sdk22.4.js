/*!
 * Copyright (c) 2022 Oracle and/or its affiliates.
 * All rights reserved. Oracle Digital Assistant Client Web SDK, Release: 22.4.0
 */
var e, factory;
(e = self),
  (factory = function () {
    return (function () {
      "use strict";
      var e = {
          6166: function (e, t, n) {
            n.r(t),
              n.d(t, {
                ActionType: function () {
                  return W;
                },
                AttachmentType: function () {
                  return G;
                },
                ConnectionState: function () {
                  return _e;
                },
                CoreError: function () {
                  return Z;
                },
                CoreEvent: function () {
                  return j;
                },
                FILE_TYPES: function () {
                  return We;
                },
                MAX_MB: function () {
                  return Ue;
                },
                MessageType: function () {
                  return Y;
                },
                RecognitionLocale: function () {
                  return w;
                },
                SenderType: function () {
                  return K;
                },
                SkillMessageSource: function () {
                  return q;
                },
                WebCore: function () {
                  return Ge;
                },
                buildPostbackMessage: function () {
                  return ce;
                },
                buildUserMessage: function () {
                  return le;
                },
                buildUserTextMessage: function () {
                  return se;
                },
                isMessagePayload: function () {
                  return we;
                },
                isPostbackPayload: function () {
                  return ye;
                },
                isValidLocale: function () {
                  return C;
                },
                isValidMessage: function () {
                  return De;
                },
              });
            var o = n(5081);
            let i = 1,
              r = 1,
              a = 1;
            const s = window,
              c = s.addEventListener,
              l = s.speechSynthesis,
              p = s.SpeechSynthesisUtterance,
              h = s.navigator,
              u = clearTimeout;
            class d {
              constructor() {
                if (!s || !l || !p) throw Error("TTSNoWebAPI");
                m().then((e) => {
                  this._voice = e;
                }),
                  c("beforeunload", (e) => {
                    l.cancel(), u(this._pauser), delete e.returnValue;
                  }),
                  c(
                    "click",
                    () => {
                      l && (l.cancel(), l.resume(), l.speak(new p(" ")));
                    },
                    { once: !0 }
                  );
              }
              static getInstance() {
                return (
                  this._service || (this._service = new d()), this._service
                );
              }
              speak(e) {
                if (this._voice) {
                  const t = new p(e);
                  (t.voice = this._voice),
                    (t.pitch = i),
                    (t.rate = r),
                    (t.volume = a),
                    l.paused && l.resume(),
                    l.speak(t),
                    this._voice.localService ||
                      (u(this._pauser), v((e) => (this._pauser = e)));
                }
              }
              cancel() {
                l.speaking && (l.cancel(), u(this._pauser));
              }
              getVoices() {
                return g();
              }
              setVoice(e) {
                return (function (e) {
                  const t = e.map((e) =>
                    Object.assign({ lang: "", name: "" }, e)
                  );
                  return g().then((e) => {
                    for (const n of t)
                      for (const t of e)
                        if (b(n.lang, t.lang) && b(n.name, t.name)) return t;
                    for (const n of t)
                      for (const t of e) if (b(n.lang, t.lang)) return t;
                    for (const n of t)
                      for (const t of e)
                        if (t.lang.indexOf(n.lang) >= 0) return t;
                    return m();
                  });
                })(e).then((e) => {
                  (this._voice = e),
                    (i = e.pitch || 1),
                    (r = e.rate || 1),
                    (a = e.volume || 1);
                });
              }
              getVoice() {
                return this._voice;
              }
            }
            function g() {
              return new Promise((e) => {
                f(e),
                  l.addEventListener("voiceschanged", () => {
                    f(e);
                  });
              });
            }
            function f(e) {
              const t = l.getVoices();
              t.length &&
                e(
                  (function (e) {
                    return Array.isArray(e) ? e : e._list;
                  })(t)
                );
            }
            function m() {
              return g().then((e) => {
                if (h && h.language) {
                  const t = e.filter((e) => e.lang === h.language)[0];
                  if (t) return t;
                }
                const t = e.filter((e) => e.default)[0];
                return t || e[0];
              });
            }
            function v(e) {
              const t = s.setTimeout(() => {
                l.speaking && (l.pause(), l.resume(), v(e));
              }, 1e4);
              e(t);
            }
            function b(e, t) {
              return e.toLowerCase() === t.toLowerCase();
            }
            var w;
            !(function (e) {
              (e.DE_DE = "de-de"),
                (e.EN_AU = "en-au"),
                (e.EN_GB = "en-gb"),
                (e.EN_IN = "en-in"),
                (e.EN_US = "en-us"),
                (e.ES_ES = "es-es"),
                (e.FR_FR = "fr-fr"),
                (e.HI_IN = "hi-in"),
                (e.IT_IT = "it-it"),
                (e.PT_BR = "pt-br");
            })(w || (w = {}));
            const y = Object.keys(w).map((e) => w[e]);
            function C(e) {
              return y.indexOf(e) >= 0;
            }
            var x;
            !(function (e) {
              (e[(e.Connecting = 0)] = "Connecting"),
                (e[(e.Open = 1)] = "Open"),
                (e[(e.Closing = 2)] = "Closing"),
                (e[(e.Closed = 3)] = "Closed");
            })(x || (x = {}));
            const _ = window.audioinput;
            function S() {
              return _;
            }
            function T(e) {
              return new Promise((e, t) => {
                const n = S();
                n.checkMicrophonePermission((o) => {
                  o
                    ? e()
                    : n.getMicrophonePermission((n, o) => {
                        n ? e() : t(o);
                      });
                });
              }).then(() => {
                const t = S();
                return t.start(e), t;
              });
            }
            function A() {
              return new Promise((e) => {
                const t = S();
                t.isCapturing() ? (t.stop(e), t.disconnect()) : e();
              });
            }
            let I = window.AudioContext;
            const E = window.navigator;
            let k = E.mediaDevices;
            const M = E.webkitGetUserMedia,
              L = E.mozGetUserMedia,
              O = !!((k && k.getUserMedia) || M || L);
            var P;
            !(function (e) {
              (e.RecognitionNotAvailable = "RecognitionNotAvailable"),
                (e.RecognitionNotReady = "RecognitionNotReady"),
                (e.RecognitionNoAPI = "RecognitionNoAPI"),
                (e.RecognitionProcessingFailure =
                  "RecognitionProcessingFailure"),
                (e.RecognitionTooMuchSpeechTimeout =
                  "RecognitionTooMuchSpeechTimeout"),
                (e.RecognitionNoSpeechTimeout = "RecognitionNoSpeechTimeout"),
                (e.RecognitionMultipleConnection =
                  "RecognitionMultipleConnection");
            })(P || (P = {}));
            const D = 4096;
            let R,
              B = !0;
            class N {
              constructor() {
                (this._streamBuffer = []),
                  (this._isRecording = !1),
                  (I = I || window.webkitAudioContext),
                  O &&
                    (void 0 === k && (k = {}),
                    void 0 === k.getUserMedia &&
                      (k.getUserMedia = (e) => {
                        const t = M || L;
                        if (!t) {
                          const e = Error(
                            "getUserMedia is not implemented in this browser"
                          );
                          return (e.name = "TypeError"), Promise.reject(e);
                        }
                        return new Promise((n, o) => {
                          t.call(navigator, e, n, o);
                        });
                      }));
              }
              static getInstance() {
                return (
                  this._service || (this._service = new N()), this._service
                );
              }
              startRecognition(e) {
                var t, n;
                return (
                  (this._startPromise = new o.Deferred()),
                  e &&
                    ((this._onRecognitionText = e.onRecognitionText),
                    (this._onAnalyserReady = e.onAnalyserReady),
                    (this._onVisualData = e.onVisualData),
                    (this._onSpeechNetworkChange = e.onSpeechNetworkChange)),
                  (null === (t = this._connection) || void 0 === t
                    ? void 0
                    : t.readyState) === x.Closing ||
                  (null === (n = this._connection) || void 0 === n
                    ? void 0
                    : n.readyState) === x.Connecting
                    ? Promise.reject(new Error(P.RecognitionMultipleConnection))
                    : (this._isRecording
                        ? this._startPromise.resolve()
                        : this._url
                        ? this._setupRecognition()
                        : this._buildServerURL().then(() =>
                            this._setupRecognition()
                          ),
                      this._startPromise.promise)
                );
              }
              stopRecognition() {
                return (
                  (this._stopPromise = new o.Deferred()),
                  this._isRecording
                    ? this._stopProcessing()
                    : this._stopPromise.resolve(),
                  this._stopPromise.promise
                );
              }
              setConfig(e) {
                return (
                  e.recognitionLocale || (e.recognitionLocale = w.EN_US),
                  e.tokenGenerator &&
                    (this._authService = o.AuthTokenService.getInstance()),
                  (this._config = e),
                  this._buildServerURL()
                );
              }
              setLocale(e) {
                C(e) &&
                  this._config &&
                  ((this._config.recognitionLocale = e),
                  this._buildServerURL());
              }
              _setConnectionState(e) {
                var t;
                null === (t = this._onSpeechNetworkChange) ||
                  void 0 === t ||
                  t.call(this, e);
              }
              _buildServerURL() {
                return ((e = this._config),
                (t = this._authService),
                new Promise((n, o) => {
                  e.tokenGenerator
                    ? t
                        .get()
                        .then((t) => {
                          (e.channelId = t.getClaim("channelId")),
                            (e.userId = t.getClaim("userId")),
                            z(e, n, o);
                        })
                        .catch((e) => o(e))
                    : z(e, n, o);
                })).then((e) => {
                  this._url = e;
                });
                var e, t;
              }
              _setupRecognition() {
                return new Promise((e, t) => {
                  O
                    ? (function (e, t) {
                        navigator.mediaDevices
                          .getUserMedia({ audio: !0 })
                          .then((t) => {
                            const n = new AudioContext();
                            e({
                              context: n,
                              stream: n.createMediaStreamSource(t),
                            });
                          })
                          .catch(() => {
                            t(Error(P.RecognitionNoAPI));
                          });
                      })(e, t)
                    : void 0 !== S()
                    ? (function (e, t) {
                        A()
                          .then(() =>
                            T({
                              audioSourceType: 6,
                              bufferSize: D,
                              streamToWebAudio: !0,
                            }).then((t) => {
                              e({ context: S().getAudioContext(), stream: t });
                            })
                          )
                          .catch(() => {
                            t(Error(P.RecognitionNoAPI));
                          });
                      })(e, t)
                    : t(Error(P.RecognitionNoAPI));
                })
                  .then((e) => {
                    (this._streamBuffer = []),
                      (R = new Float32Array(0)),
                      (this._connection = this._getSpeechServerConnection(
                        this._url
                      ));
                    const t = (function (e, t, n) {
                      const o = e.createAnalyser();
                      (o.smoothingTimeConstant = 0.8), (o.fftSize = 256);
                      const i = e.createScriptProcessor(D, 1, 1);
                      return (
                        i.addEventListener("audioprocess", n),
                        t.connect(o),
                        o.connect(i),
                        i.connect(e.destination),
                        { analyser: o, processor: i }
                      );
                    })(e.context, e.stream, this._onAudioProcess.bind(this));
                    this._onAnalyserReady && this._onAnalyserReady(t.analyser),
                      (this._context = e.context),
                      (this._stream = e.stream),
                      (this._analyser = t.analyser),
                      (this._scriptProcessor = t.processor);
                  })
                  .catch((e) => {
                    this._startPromise && this._startPromise.reject(e);
                  });
              }
              _getSpeechServerConnection(e) {
                const t = new WebSocket(e);
                return (
                  (t.onopen = this._onOpen.bind(this)),
                  (t.onclose = this._onClose.bind(this)),
                  (t.onmessage = this._onMessage.bind(this)),
                  (t.onerror = this._onError.bind(this)),
                  t
                );
              }
              _onOpen() {
                this._config.tokenGenerator
                  ? this._authService.get().then((e) => {
                      this._connection.send(`Bearer ${e.token}`),
                        this._setConnectionState(x.Open),
                        this._sendPreConnectionBuffer();
                    })
                  : (this._setConnectionState(x.Open),
                    this._sendPreConnectionBuffer());
              }
              _onClose() {
                this._isRecording && this._stopProcessing(),
                  this._stopPromise &&
                    (this._stopPromise.resolve(), (this._stopPromise = void 0)),
                  this._setConnectionState(x.Closed);
              }
              _onMessage(e) {
                try {
                  const t = JSON.parse(e.data);
                  if (!t.event && t.code) throw e;
                  const n = (function (e) {
                    let t, n;
                    const o = e.requestId,
                      i = e.nbest;
                    return (
                      "partialResult" === e.event
                        ? ((t = "partial"), (n = i[0].utterance))
                        : i && i.length
                        ? ((t = "final"), (n = i[0].utterance))
                        : ((t = "error"),
                          (n = e.resultCode
                            ? P.RecognitionTooMuchSpeechTimeout
                            : P.RecognitionNoSpeechTimeout)),
                      { requestId: o, type: t, text: n, message: e }
                    );
                  })(t);
                  "finalResult" === t.event && this.stopRecognition(),
                    this._onRecognitionText && this._onRecognitionText(n);
                } catch (e) {
                  this._notifyError(P.RecognitionProcessingFailure),
                    this.stopRecognition();
                }
              }
              _onError() {
                this._connection.readyState === x.Open &&
                  (this._notifyError(P.RecognitionProcessingFailure),
                  this._connection.close());
              }
              _notifyError(e) {
                this._onRecognitionText &&
                  this._onRecognitionText({
                    requestId: "",
                    text: e,
                    type: "error",
                  });
              }
              _onAudioProcess(e) {
                this._startPromise &&
                  ((this._isRecording = !0),
                  this._startPromise.resolve(),
                  (this._startPromise = void 0));
                const t = e.inputBuffer.getChannelData(0),
                  n = e.inputBuffer.sampleRate;
                try {
                  const e = (function (e, t, n) {
                    if (n === t) return e;
                    if (n > t) throw Error();
                    const o = 48e3,
                      i = 44100;
                    let r = [];
                    if (t === o) r = F;
                    else {
                      if (t !== i) throw Error();
                      r = U;
                    }
                    const a = t / n;
                    let s, c, l;
                    B
                      ? ((s = Math.floor(e.length % a)),
                        (c = e.length - s),
                        (l = 0 === s ? Array.from(e) : e.slice(0, c)))
                      : ((s = Math.floor((e.length + R.length - r.length) % a)),
                        (c = e.length + R.length - r.length - s),
                        (l = new Float32Array(R.length + c)),
                        l.set(R),
                        l.set(e.slice(0, c), R.length));
                    const p = Math.floor(c / a),
                      h = new Int16Array(p),
                      u = -1,
                      d = 32767;
                    if (t === o)
                      for (let e = r.length; e < l.length; e += a) {
                        let t = 0;
                        for (let n = 0; n < r.length; n++) t += l[e - n] * r[n];
                        const n = Math.max(Math.min(t, 1), u) * d;
                        h[(e - r.length) / a] = n;
                      }
                    else {
                      const e = [];
                      for (let t = r.length; t < l.length; t++) {
                        let n = 0;
                        for (let e = 0; e < r.length; e++) n += l[t - e] * r[e];
                        e[t - r.length] = n;
                      }
                      for (let t = 0; t < p; t++) {
                        const n = 3,
                          o = t * a,
                          i = Math.floor(o) - n + 1,
                          r = Math.floor(o) + n;
                        let s = 0;
                        for (let t = i; t <= r; t++)
                          s +=
                            (t < 0
                              ? e[0]
                              : t >= e.length
                              ? e[e.length - 1]
                              : e[t]) * H(n, o - t);
                        h[t] = Math.max(Math.min(s, 1), u) * d;
                      }
                    }
                    return (
                      (R = B
                        ? e.slice(c - r.length - R.length)
                        : e.slice(c - r.length - (R.length - r.length))),
                      (B = !1),
                      h.buffer
                    );
                  })(t, n, 16e3);
                  this._onVisualData && this._processAnalyser(this._analyser),
                    this._sendBuffer(e);
                } catch (e) {
                  this._notifyError(P.RecognitionProcessingFailure),
                    this.stopRecognition();
                }
              }
              _processAnalyser(e) {
                if (e) {
                  const t = new Uint8Array(e.frequencyBinCount);
                  e.getByteFrequencyData(t),
                    this._onVisualData && this._onVisualData(t);
                }
              }
              _sendBuffer(e) {
                this._connection.readyState !== x.Open ||
                this._streamBuffer.length
                  ? this._streamBuffer.push(e)
                  : this._connection.send(e);
              }
              _sendPreConnectionBuffer() {
                if (this._connection.readyState === x.Open)
                  for (; this._streamBuffer.length; ) {
                    const e = this._streamBuffer.shift();
                    e && this._connection.send(e);
                  }
              }
              _stopProcessing() {
                var e, t;
                (this._isRecording = !1),
                  this._connection &&
                    (this._connection.readyState === x.Open &&
                      (this._connection.send("Done"), this._connection.close()),
                    this._scriptProcessor && this._scriptProcessor.disconnect(),
                    this._analyser && this._analyser.disconnect(),
                    S()
                      ? A()
                      : ((e = this._context),
                        (t = this._stream) &&
                          (t.mediaStream &&
                            t.mediaStream.getAudioTracks().forEach((e) => {
                              e.stop();
                            }),
                          t.disconnect()),
                        e && e.close()),
                    (this._scriptProcessor = void 0),
                    (this._analyser = void 0),
                    (this._stream = void 0),
                    (this._context = void 0),
                    (this._streamBuffer = []),
                    (B = !0),
                    (R = new Float32Array(0)));
              }
            }
            const V = "/voice/stream/recognize";
            function z(e, t, n) {
              (e.channelId && e.userId) || n(Error(P.RecognitionNotReady)),
                t(
                  (function (e) {
                    const t = `ws${e.isTLS ? "s" : ""}://`,
                      n = `${V}/${e.recognitionLocale}/generic`,
                      i = {
                        channelId: e.channelId || "",
                        encoding: "audio/raw",
                        userId: e.userId || "",
                      };
                    return (
                      e.tokenGenerator && (i.jwtInBody = "true"),
                      (0, o.buildURL)(t, e.URI, i, n)
                    );
                  })(e)
                );
            }
            const F = [
                -25033838264794034e-21, -3645156113737857e-20,
                -11489993827892933e-21, 393243788874656e-19,
                6998419352067277e-20, 37556691270439976e-21,
                -476966455345305e-19, -0.00011379935461751734,
                -8400957697117619e-20, 4208817777607469e-20,
                0.00016391587447478332, 0.00015508372993570357,
                -1253765788919669e-20, -0.00021258262011091092,
                -0.0002524059896175195, -51874329668708116e-21,
                0.0002479230009768214, 0.00037351534477673157,
                0.00016157590781788105, -0.0002541085239198603,
                -0.000510486865332593, -0.0003246104617540939,
                0.00021219136947965464, 0.0006488877825604561,
                0.0005444416935293036, -0.0001016639071691704,
                -0.0007673001147209819, -0.0008176720912938691,
                -972696982411551e-19, 0.0008376185852528038,
                0.0011319450250252222, 0.0004008193339799052,
                -0.0008262743020160207, -0.0014643282305934196,
                -0.0008183365045047033, 0.0006964471772153777,
                0.001780467922489105, 0.0013489288090360295,
                -0.00041122152287042, -0.0020347535966250413,
                -0.0019782994815083733, -6247794246099269e-20,
                0.002171643809964705, 0.0026761621389245617,
                0.00074944268608935, -0.00212817775887288,
                -0.003394541347147186, -0.0016615884301227524,
                0.001837545335885159, 0.004067170702246546,
                0.0027936171643976352, -0.001233420727213658,
                -0.004610035314537476, -0.004119319153202972,
                0.00025459137646049936, 0.00492286494534436,
                0.005588805700369816, 0.001150762425755883,
                -0.004891042781491068, -0.0071267634777626675,
                -0.003021979039818941, 0.00438688631315642,
                0.008631467181982988, 0.005385139236634672,
                -0.003268406079325266, -0.009973661255235284,
                -0.008256256502745316, 0.0013719935383757782,
                0.010993210336541666, 0.011651337116264694,
                0.0015082475865128093, -0.01148872195209017,
                -0.015609515327517686, -0.005671504441670989,
                0.011188303272599716, 0.02024519058502148, 0.011637590928971467,
                -0.009667754909210324, -0.025878090076785515,
                -0.020500381603699786, 0.006098908137700642,
                0.033428666116203716, 0.03513487017573178, 0.001719739622764723,
                -0.046085580848361105, -0.06623078150315037,
                -0.023349941728869696, 0.08292213207159124, 0.21069217442624302,
                0.2973829711397418, 0.2973829711397419, 0.21069217442624305,
                0.08292213207159124, -0.023349941728869693,
                -0.06623078150315037, -0.046085580848361105,
                0.0017197396227647225, 0.03513487017573178,
                0.033428666116203716, 0.006098908137700641,
                -0.020500381603699783, -0.025878090076785508,
                -0.009667754909210326, 0.011637590928971469,
                0.020245190585021472, 0.011188303272599716,
                -0.00567150444167099, -0.015609515327517682,
                -0.01148872195209017, 0.001508247586512809,
                0.011651337116264699, 0.010993210336541666,
                0.0013719935383757782, -0.008256256502745314,
                -0.009973661255235283, -0.0032684060793252657,
                0.00538513923663467, 0.008631467181982988, 0.004386886313156419,
                -0.0030219790398189413, -0.0071267634777626675,
                -0.0048910427814910715, 0.0011507624257558842,
                0.005588805700369813, 0.00492286494534436,
                0.00025459137646049936, -0.004119319153202973,
                -0.004610035314537475, -0.0012334207272136583,
                0.002793617164397636, 0.004067170702246546,
                0.0018375453358851592, -0.0016615884301227509,
                -0.0033945413471471847, -0.0021281777588728797,
                0.0007494426860893505, 0.0026761621389245612,
                0.0021716438099647056, -6247794246099253e-20,
                -0.001978299481508373, -0.0020347535966250404,
                -0.00041122152287042, 0.0013489288090360292,
                0.0017804679224891048, 0.0006964471772153777,
                -0.0008183365045047026, -0.00146432823059342,
                -0.0008262743020160207, 0.0004008193339799063,
                0.0011319450250252222, 0.0008376185852528037,
                -9726969824115494e-20, -0.0008176720912938694,
                -0.0007673001147209783, -0.00010166390716916983,
                0.0005444416935293033, 0.0006488877825604562,
                0.0002121913694796546, -0.00032461046175409424,
                -0.000510486865332593, -0.00025410852391986036,
                0.0001615759078178811, 0.0003735153447767315,
                0.00024792300097682137, -5187432966870808e-20,
                -0.0002524059896175194, -0.00021258262011091095,
                -1253765788919669e-20, 0.0001550837299357036,
                0.0001639158744747833, 42088177776074685e-21,
                -8400957697117623e-20, -0.00011379935461751733,
                -4769664553453051e-20, 3755669127044002e-20,
                699841935206728e-19, 393243788874656e-19,
                -11489993827892933e-21, -3645156113737856e-20,
                -2503383826479402e-20,
              ],
              U = [
                -5044267067893139e-21, 5738740247594612e-21,
                1611195555688156e-20, 10560179594562795e-21,
                -1242816862904201e-20, -3084430704328611e-20,
                -18160396924882423e-21, 2303124169528074e-20,
                5216612702894834e-20, 2806026886746509e-20,
                -389608521587068e-19, -8174245278012476e-20,
                -4037543061985353e-20, 619375276294956e-19,
                0.00012143092661620545, 55083199655424166e-21,
                -9401891583478883e-20, -0.00017326981522755043,
                -7198069055926206e-20, 0.0001376274218691789,
                0.00023946132645647525, 9064030545698025e-20,
                -0.00019557611633250834, -0.0003223511502826996,
                -0.00011036322783022617, 0.0002710935667931249,
                0.00042440564349633953, 0.00013013140955365376,
                -0.00036784896615780913, -0.0005481886438481025,
                -0.00014855826094166272, 0.0004899798946967381,
                0.000696340560985472, 0.00016383778624615643,
                -0.0006421263408051642, -0.0008715631880363658,
                -0.00017369118859371453, 0.000829476349448821,
                0.0010766146787146871, 0.00017530890385814463,
                -0.0010578310750603923, -0.001314320458073489,
                -0.0001652844648711556, 0.0013337004262191077,
                0.0015876076783199174, 0.000139534308084411,
                -0.0016644454627712116, -0.001899573527380014,
                -9319422024995832e-20, 0.002058491185395933,
                0.0022536018141979036, 20477911370491685e-21,
                -0.0025256449668619525, -0.0026535487754524955,
                8552498376473957e-20, 0.0030775744811722015, 0.0031040297261921,
                -0.00023314744969763122, -0.003728529808331677,
                -0.003610856230113392, 0.000432598472497653,
                0.0044964472481822506, 0.004181705019767344,
                -0.0006966685466235378, -0.005404666489478738,
                -0.00482715710731867, 0.0010418556659416306,
                0.006484667519607787, 0.00556235368742558,
                -0.0014902159613265254, -0.007780573986407925,
                -0.0064097301786953595, 0.002072517010858728,
                0.009356870546119134, 0.0074037416266333166,
                -0.00283386009764953, -0.011312323822665827,
                -0.008599512596140524, 0.003844300507349054,
                0.013806774337071994, 0.01008985372973804,
                -0.005220460312862638, -0.01711716324115331,
                -0.01204196749753927, 0.007174046245357611,
                0.021768247992024713, 0.01478690833035584,
                -0.010136389804721707, -0.02888735624896028,
                -0.019078400739739057, 0.015146805312378952,
                0.041410446665863104, 0.027068163980255515,
                -0.025512027260482153, -0.07011218378743589,
                -0.04829678433503421, 0.06041368701604651, 0.21199607414538668,
                0.3213532652447261, 0.3213532652447261, 0.21199607414538668,
                0.060413687016046526, -0.04829678433503422,
                -0.07011218378743589, -0.025512027260482153,
                0.027068163980255515, 0.041410446665863104,
                0.015146805312378952, -0.019078400739739057,
                -0.02888735624896028, -0.010136389804721703,
                0.01478690833035584, 0.021768247992024713, 0.007174046245357611,
                -0.01204196749753927, -0.01711716324115331,
                -0.005220460312862639, 0.010089853729738038,
                0.013806774337071994, 0.0038443005073490553,
                -0.008599512596140524, -0.011312323822665827,
                -0.0028338600976495314, 0.007403741626633317,
                0.009356870546119134, 0.002072517010858727,
                -0.006409730178695359, -0.007780573986407925,
                -0.001490215961326526, 0.005562353687425577,
                0.006484667519607787, 0.0010418556659416256,
                -0.004827157107318673, -0.005404666489478739,
                -0.0006966685466235378, 0.004181705019767345,
                0.004496447248182251, 0.0004325984724976533,
                -0.003610856230113392, -0.003728529808331677,
                -0.0002331474496976315, 0.0031040297261921003,
                0.003077574481172201, 8552498376473897e-20,
                -0.002653548775452496, -0.002525644966861952,
                2047791137049164e-20, 0.002253601814197904,
                0.002058491185395933, -9319422024995909e-20,
                -0.001899573527380014, -0.0016644454627712118,
                0.00013953430808441038, 0.0015876076783199174,
                0.0013337004262191077, -0.0001652844648711556,
                -0.0013143204580734896, -0.0010578310750603925,
                0.00017530890385814333, 0.0010766146787146878,
                0.0008294763494488195, -0.00017369118859371463,
                -0.00087156318803637, -0.0006421263408051633,
                0.00016383778624615698, 0.0006963405609854716,
                0.0004899798946967381, -0.00014855826094166245,
                -0.0005481886438481027, -0.00036784896615780924,
                0.00013013140955365368, 0.00042440564349633964,
                0.00027109356679312505, -0.00011036322783022619,
                -0.0003223511502826996, -0.00019557611633250842,
                9064030545698017e-20, 0.00023946132645647525,
                0.00013762742186917883, -7198069055926207e-20,
                -0.0001732698152275505, -9401891583478886e-20,
                5508319965542416e-20, 0.00012143092661620549,
                6193752762949557e-20, -4037543061985352e-20,
                -8174245278012477e-20, -38960852158706805e-21,
                28060268867465078e-21, 52166127028948336e-21,
                2303124169528077e-20, -18160396924882423e-21,
                -30844307043286126e-21, -12428168629042018e-21,
                10560179594562806e-21, 1611195555688157e-20,
                5738740247594605e-21, -5044267067893138e-21,
              ];
            function H(e, t) {
              let n;
              if (0 === t) n = 1;
              else if (t >= e || t <= -e) n = 0;
              else {
                const o = Math.PI * t;
                n = (e * Math.sin(o) * Math.sin(o / e)) / (o * o);
              }
              return n;
            }
            var j, W, G, Y, K, q, $;
            !(function (e) {
              (e.Open = "open"),
                (e.Close = "close"),
                (e.MessageReceived = "message:received"),
                (e.MessageSent = "message:sent"),
                (e.State = "state");
            })(j || (j = {})),
              (function (e) {
                (e.Call = "call"),
                  (e.Location = "location"),
                  (e.Postback = "postback"),
                  (e.Share = "share"),
                  (e.Url = "url"),
                  (e.Webview = "webview");
              })(W || (W = {})),
              (function (e) {
                (e.Image = "image"),
                  (e.Video = "video"),
                  (e.Audio = "audio"),
                  (e.File = "file");
              })(G || (G = {})),
              (function (e) {
                (e.Attachment = "attachment"),
                  (e.Card = "card"),
                  (e.Location = "location"),
                  (e.Postback = "postback"),
                  (e.Raw = "raw"),
                  (e.Suggest = "suggest"),
                  (e.Text = "text"),
                  (e.CloseSession = "closeSession"),
                  (e.SessionClosed = "sessionClosed"),
                  (e.Table = "table"),
                  (e.Form = "form"),
                  (e.TableForm = "tableForm");
              })(Y || (Y = {})),
              (function (e) {
                (e.Skill = "bot"), (e.User = "user");
              })(K || (K = {})),
              (function (e) {
                (e.Agent = "AGENT"), (e.Bot = "BOT");
              })(q || (q = {})),
              (function (e) {
                (e.ConnectionNone = "ConnectionNone"),
                  (e.ConnectionExplicitClose = "ConnectionExplicitClose"),
                  (e.MessageInvalid = "MessageInvalid"),
                  (e.NetworkFailure = "NetworkFailure"),
                  (e.NetworkOffline = "NetworkOffline"),
                  (e.ProfileInvalid = "ProfileInvalid"),
                  (e.TtsNotAvailable = "TtsNotAvailable"),
                  (e.TTSNoWebAPI = "TTSNoWebAPI"),
                  (e.SuggestionsEmptyRequest = "SuggestionsEmptyRequest"),
                  (e.SuggestionsInvalidRequest = "SuggestionsInvalidRequest"),
                  (e.SuggestionsTimeout = "SuggestionsTimeout"),
                  (e.UploadBadFile = "UploadBadFile"),
                  (e.UploadMaxSize = "UploadMaxSize"),
                  (e.UploadNetworkFail = "UploadNetworkFail"),
                  (e.UploadNotAvailable = "UploadNotAvailable"),
                  (e.UploadZeroSize = "UploadZeroSize"),
                  (e.LocationNoAPI = "LocationNoAPI"),
                  (e.LocationNotAvailable = "LocationNotAvailable"),
                  (e.LocationTimeout = "LocationTimeout"),
                  (e.LocationInvalid = "LocationInvalid");
              })($ || ($ = {}));
            const Z = Object.assign(
              Object.assign(Object.assign({}, $), o.AuthError),
              P
            );
            function J(e, t, n) {
              e.setRequestHeader(t, n);
            }
            function X(e, t, n) {
              e.addEventListener(t, n);
            }
            function Q(e) {
              return (e.lastIndex = 0), e;
            }
            function ee(e) {
              return Error(e);
            }
            function te(e) {
              return Promise.reject(ee(e));
            }
            const ne = navigator,
              oe = ne && ne.geolocation;
            function ie(e) {
              return "number" == typeof e;
            }
            function re(e, t, n) {
              return e >= t && e <= n;
            }
            function ae(e, t) {
              const n = (function (e) {
                const t = e.split("/")[0].toLowerCase();
                switch (t) {
                  case G.Audio:
                  case G.Image:
                  case G.Video:
                    return t;
                  default:
                    return G.File;
                }
              })(e);
              return {
                messagePayload: {
                  type: Y.Attachment,
                  attachment: { type: n, url: t },
                },
              };
            }
            function se(e, t) {
              const n = { messagePayload: { text: e, type: Y.Text } };
              return (
                t &&
                  (n.sdkMetadata
                    ? (n.sdkMetadata.speechId = t)
                    : (n.sdkMetadata = { speechId: t })),
                n
              );
            }
            function ce(e) {
              let t;
              return (
                (t = "label" in e ? e.label : e.text || ""),
                {
                  messagePayload: {
                    text: t,
                    postback: e.postback,
                    type: Y.Postback,
                  },
                }
              );
            }
            function le(e) {
              return { messagePayload: e };
            }
            const pe = "; ",
              he = "",
              ue = /<[^>]+>/g,
              de = /&#(\d+);/g,
              ge = /&#[xX]([\da-fA-F]+);/g;
            function fe(e, t) {
              const n = e.messagePayload;
              let o = he;
              switch (n.type) {
                case Y.Attachment:
                  o = (function (e, t) {
                    return `${t[`${e.type}_${e.attachment.type}`]}`;
                  })(n, t);
                  break;
                case Y.Card:
                  o = (function (e, t) {
                    const n = e.cards;
                    let o = he,
                      i = he;
                    if (n && n.length) {
                      const e = t.card,
                        r = e ? (e.indexOf("{0}") >= 0 ? e : `${e} {0}`) : he,
                        a = n.length > 1;
                      o = n
                        .filter((e) => e.title)
                        .map((e, t) => {
                          const n = `${
                              a ? `${r.replace("{0}", `${t + 1}`)}: ` : he
                            }`,
                            o = e.description,
                            s = o ? pe + o : he;
                          if (e.actions) {
                            const t = (function (e) {
                              return (
                                (e &&
                                  e.length &&
                                  e
                                    .filter((e) => e && e.label)
                                    .map((e) => e.label)
                                    .join(pe)) ||
                                he
                              );
                            })(e.actions);
                            i = t ? pe + t : he;
                          }
                          return `${n}${e.title}${s}${i}`;
                        })
                        .join(pe);
                    }
                    return o;
                  })(n, t);
                  break;
                case Y.Location:
                  o = (function (e) {
                    const t = e.location;
                    return `${t.title ? `${t.title}; ` : he}${t.latitude},${
                      t.longitude
                    }`;
                  })(n);
                  break;
                case Y.Text:
                  o = n.text;
                  break;
                case Y.Table:
                  o = (function (e, t) {
                    const n = e.paginationInfo,
                      o = n && n.status;
                    return (
                      (o ? o + pe : he) +
                      e.rows
                        .filter((e) => e && e.fields && e.fields.length)
                        .map((e, n) => ve(e, n, t))
                        .join(pe)
                    );
                  })(n, t);
                  break;
                case Y.Form:
                  o = (function (e, t) {
                    const n = e.paginationInfo,
                      o = n && n.status;
                    return (
                      (o ? o + pe : he) +
                      e.forms
                        .filter((e) => e && e.fields && e.fields.length)
                        .map((e, n) => ve(e, n, t))
                        .join(pe)
                    );
                  })(n, t);
                  break;
                case Y.TableForm:
                  o = (function (e, t) {
                    const n = e.paginationInfo,
                      o = n && n.status;
                    return (
                      (o ? o + pe : he) +
                      e.rows
                        .filter((e) => e && e.fields && e.fields.length)
                        .map(
                          (n, o) => ve(n, o, t) + pe + be(e.forms[o].fields, t)
                        )
                        .join(pe)
                    );
                  })(n, t);
              }
              return (i = (function (e, t) {
                const n = e.headerText || he,
                  o = e.footerText || he;
                return (
                  n +
                  (n && t ? pe : he) +
                  t +
                  me(e.actions) +
                  (o ? `; ${o}` : he) +
                  me(e.globalActions)
                );
              })(n, o)) && i.length
                ? i
                    .replace(Q(de), (e, t) => String.fromCharCode(t))
                    .replace(Q(ge), (e, t) => {
                      const n = Number.parseInt(`0x${t}`, 16);
                      return String.fromCharCode(n);
                    })
                    .replace(Q(ue), he)
                : he;
              var i;
            }
            function me(e) {
              let t = he;
              return (
                e &&
                  e.forEach((e) => {
                    e.label && (t = `${t}; ${e.label}`);
                  }),
                t
              );
            }
            function ve(e, t, n) {
              return `${(n.itemIterator || "").replace(
                "{0}",
                `${t + 1}`
              )}: ${be(e.fields, n)}`;
            }
            function be(e, t) {
              return e && e.length
                ? e
                    .filter((e) => e && e.value)
                    .map(
                      (e) =>
                        `${e.label}: ${
                          "link" === e.displayType
                            ? (t.linkField || "").replace("{0}", e.label)
                            : e.value
                        }`
                    )
                    .join(pe)
                : he;
            }
            function we(e) {
              return e && "object" == typeof e && "type" in e;
            }
            function ye(e) {
              return e && "object" == typeof e && "postback" === e.type;
            }
            function Ce() {
              let e = {};
              return {
                bind: (t, n) => {
                  t &&
                    n &&
                    n instanceof Function &&
                    (Object.prototype.hasOwnProperty.call(e, t)
                      ? e[t].push(n)
                      : (e[t] = [n]));
                },
                trigger: (t, ...n) => {
                  if (Object.prototype.hasOwnProperty.call(e, t)) {
                    const o = null != n ? n : [];
                    e[t].forEach((e) => {
                      try {
                        e.call(null, ...o);
                      } catch (e) {
                        console.error(`${t} listener error`, e);
                      }
                    });
                  }
                },
                unbind: (t, n) => {
                  t
                    ? n || !Object.prototype.hasOwnProperty.call(e, t)
                      ? (e[t] = e[t].filter((e) => e !== n))
                      : e[t].splice(0, e[t].length)
                    : (e = {});
                },
              };
            }
            var xe, _e;
            !(function (e) {
              (e.Open = "open"),
                (e.Close = "close"),
                (e.Error = "error"),
                (e.Message = "message"),
                (e.MessageReceived = "message:received"),
                (e.MessageSent = "message:sent"),
                (e.State = "state");
            })(xe || (xe = {})),
              (function (e) {
                (e[(e.Connecting = 0)] = "Connecting"),
                  (e[(e.Open = 1)] = "Open"),
                  (e[(e.Closing = 2)] = "Closing"),
                  (e[(e.Closed = 3)] = "Closed");
              })(_e || (_e = {}));
            class Se {
              constructor(e) {
                (this.dispatcher = e), (this.state = _e.Closed);
              }
              getState() {
                return this.state;
              }
              isOpen() {
                return this.state === _e.Open;
              }
              isClosed() {
                return this.state === _e.Closed;
              }
              on(e, t) {
                this.dispatcher.bind(e, t);
              }
              off(e, t) {
                this.dispatcher.unbind(e, t);
              }
              setState(e) {
                (this.state = e), this.dispatcher.trigger(xe.State, e);
              }
            }
            const Te = { state: { type: "ping" } };
            class Ae extends Se {
              constructor(e) {
                super(e.dispatcher),
                  (this.url = e.url),
                  (this.authService = e.authService);
              }
              open() {
                return this.isOpen()
                  ? Promise.resolve()
                  : navigator.onLine
                  ? this.connect()
                  : te(Z.NetworkOffline);
              }
              close() {
                return this.isClosed() ? Promise.resolve() : this.disconnect();
              }
              send(e) {
                return new Promise((t, n) => {
                  if (this.isOpen()) {
                    const o = new XMLHttpRequest();
                    o.open("POST", this.url),
                      J(o, "Content-Type", "application/json"),
                      (o.onload = () => {
                        o.status >= 200 && o.status < 300
                          ? t(e)
                          : n(o.response);
                      }),
                      (o.onerror = () => {
                        n(ee(Z.NetworkFailure));
                      }),
                      this.sendRequest(o, JSON.stringify(e)).catch(n);
                  } else n(ee(Z.ConnectionNone));
                });
              }
              updateConnectionUrl(e) {
                this.url = (0, o.getLongPollURL)(
                  e.URI,
                  { channelId: e.channelId, userId: e.userId },
                  e.isTLS
                );
              }
              connect() {
                return (
                  this.openPromise ||
                    ((this.openPromise = new o.Deferred()),
                    this.setState(_e.Connecting),
                    this.openConnection()
                      .then(() => {
                        this.onOpen(), this.poll();
                      })
                      .catch((e) => {
                        this.openPromise &&
                          (this.openPromise.reject(e),
                          (this.openPromise = null)),
                          this.onClose();
                      })),
                  this.openPromise.promise
                );
              }
              disconnect() {
                return (
                  this.closePromise ||
                    ((this.closePromise = new o.Deferred()),
                    this.setState(_e.Closing),
                    this.xhr.abort(),
                    this.onClose()),
                  this.closePromise.promise
                );
              }
              openConnection() {
                return new Promise((e, t) => {
                  const n = new XMLHttpRequest();
                  n.open("POST", this.url),
                    J(n, "Content-Type", "application/json"),
                    (n.onload = () => {
                      n.status >= 200 && n.status < 300 ? e() : t(n.response);
                    }),
                    (n.onerror = () => {
                      t(ee(Z.NetworkFailure));
                    }),
                    this.sendRequest(n, JSON.stringify(Te)).catch((e) => {
                      t(e);
                    });
                });
              }
              poll() {
                let e = 0;
                this.isOpen() &&
                  ((this.xhr = new XMLHttpRequest()),
                  this.xhr.open("GET", this.url),
                  (this.xhr.onload = () => {
                    (e = 0),
                      this.xhr.status &&
                        200 === this.xhr.status &&
                        this.onMessages(this.xhr.responseText),
                      this.poll();
                  }),
                  (this.xhr.onerror = () => {
                    5 === e ? this.close() : (e++, this.poll());
                  }),
                  this.sendRequest(this.xhr));
              }
              sendRequest(e, t) {
                return this.authService
                  ? new Promise((n, o) => {
                      var i;
                      null === (i = this.authService) ||
                        void 0 === i ||
                        i
                          .get()
                          .then((o) => {
                            J(e, "Authorization", `Bearer ${o.token}`),
                              e.send(t),
                              n();
                          })
                          .catch((e) => {
                            o(e);
                          });
                    })
                  : (e.send(t), Promise.resolve());
              }
              onMessages(e) {
                try {
                  JSON.parse(e).forEach((e) => {
                    this.onMessage(JSON.parse(e));
                  });
                } catch (e) {
                  this.onError(e);
                }
              }
              onOpen() {
                this.openPromise &&
                  (this.openPromise.resolve(), (this.openPromise = null)),
                  this.closePromise &&
                    (this.closePromise.reject(), (this.closePromise = null)),
                  this.setState(_e.Open),
                  this.dispatcher.trigger(xe.Open);
              }
              onClose() {
                this.closePromise &&
                  (this.closePromise.resolve(), (this.closePromise = null)),
                  (this.openPromise = null),
                  this.setState(_e.Closed),
                  this.dispatcher.trigger(xe.Close);
              }
              onMessage(e) {
                this.dispatcher.trigger(xe.Message, e),
                  this.dispatcher.trigger(xe.MessageReceived, e);
              }
              onError(e) {
                this.dispatcher.trigger(xe.Error, e);
              }
            }
            const Ie = Promise,
              Ee = 3e6,
              ke = window;
            class Me extends Se {
              constructor(e) {
                super(e.dispatcher),
                  (this.isExplicitClose = !1),
                  (this.isHeartBeatAlive = !1),
                  (this.isTokenValid = !1),
                  (this.retryAttempt = 0),
                  (this.reconnectAttempted = !1),
                  (this.ws = null),
                  (this.url = e.url),
                  (this.authService = e.authService),
                  (this.retryInterval = e.retryInterval),
                  (this.retryMaxAttempts = e.retryMaxAttempts);
              }
              open() {
                return this.isOpen()
                  ? Ie.resolve()
                  : navigator.onLine
                  ? this.connect()
                  : te(Z.NetworkOffline);
              }
              close() {
                return (
                  (this.isExplicitClose = !0),
                  clearTimeout(this.retryMonitor),
                  this.isClosed() ? Ie.resolve() : this.disconnect()
                );
              }
              send(e) {
                return new Ie((t, n) => {
                  if (this.ws && this.isOpen()) {
                    this.isTokenValid = !0;
                    try {
                      this.ws.send(JSON.stringify(e)),
                        t(e),
                        ((o = e).state &&
                          o.state.type &&
                          "ping" === o.state.type) ||
                          (this.dispatcher.trigger(xe.Message, e),
                          this.dispatcher.trigger(xe.MessageSent, e));
                    } catch (e) {
                      n(ee(Z.NetworkFailure));
                    }
                  } else n(ee(Z.ConnectionNone));
                  var o;
                });
              }
              updateConnectionUrl(e) {
                this.url = (0, o.getWebSocketURL)(
                  e.URI,
                  { channelId: e.channelId, userId: e.userId },
                  e.isTLS,
                  e.channel
                );
              }
              connect() {
                return (
                  this.openPromise ||
                    ((this.openPromise = new o.Deferred()),
                    this.setState(_e.Connecting),
                    this.openConnection()),
                  this.openPromise.promise
                );
              }
              disconnect() {
                var e;
                return (
                  this.closePromise ||
                    ((this.closePromise = new o.Deferred()),
                    this.setState(_e.Closing),
                    null === (e = this.ws) || void 0 === e || e.close()),
                  this.closePromise.promise
                );
              }
              openConnection() {
                try {
                  (this.ws = new WebSocket(this.url)),
                    (this.ws.onopen = () => {
                      this.setState(_e.Open),
                        (this.reconnectAttempted = !1),
                        this.authService
                          ? this.authenticateConnection()
                          : this.onOpen();
                    }),
                    (this.ws.onclose = (e) => {
                      this.setState(_e.Closed),
                        this.stopMonitors(),
                        this.isExplicitClose
                          ? this.rejectAndCloseConnection(
                              Z.ConnectionExplicitClose,
                              e
                            )
                          : this.authService &&
                            !this.isTokenValid &&
                            1006 !== e.code
                          ? this.rejectAndCloseConnection(Z.AuthExpiredToken, e)
                          : this.reconnectAttempted || this.retryConnection(e);
                    }),
                    (this.ws.onmessage = this.onMessage.bind(this)),
                    (this.ws.onerror = () => {
                      this.retryConnection(),
                        (this.reconnectAttempted = !0),
                        this.onError.bind(this);
                    });
                } catch (e) {
                  this.retryConnection();
                }
              }
              retryConnection(e) {
                this.retryAttempt < this.retryMaxAttempts
                  ? (this.retryAttempt++,
                    (this.retryMonitor = ke.setTimeout(
                      this.openConnection.bind(this),
                      this.retryInterval
                    )))
                  : this.rejectAndCloseConnection(Z.NetworkFailure, e);
              }
              rejectAndCloseConnection(e, t) {
                this.openPromise && this.openPromise.reject(ee(e)),
                  this.onClose(t);
              }
              authenticateConnection() {
                var e;
                (this.isTokenValid = !1),
                  null === (e = this.authService) ||
                    void 0 === e ||
                    e
                      .get()
                      .then((e) => {
                        this.send(
                          (function (e) {
                            return {
                              state: {
                                token: e,
                                tokenType: "jwt",
                                type: "auth",
                              },
                            };
                          })(e.token)
                        ).then(() => {
                          setTimeout(() => (this.isTokenValid = !0), 1e4),
                            this.onOpen();
                        });
                      })
                      .catch((e) => {
                        var t;
                        null === (t = this.openPromise) ||
                          void 0 === t ||
                          t.reject(e),
                          this.close();
                      });
              }
              onOpen() {
                var e;
                this.stopMonitors(),
                  clearTimeout(this.retryMonitor),
                  (this.heartBeatMonitor = this.initHeartBeat()),
                  (this.refreshMonitor =
                    ((e = this),
                    ke.setTimeout(() => {
                      Le(e);
                    }, Ee))),
                  (this.retryAttempt = 0),
                  (this.isExplicitClose = !1),
                  (this.isTokenValid = !1),
                  this.openPromise &&
                    (this.openPromise.resolve(), (this.openPromise = null)),
                  this.closePromise &&
                    (this.closePromise.reject(), (this.closePromise = null)),
                  this.dispatcher.trigger(xe.Open);
              }
              onClose(e) {
                (this.retryAttempt = 0),
                  (this.isExplicitClose = !1),
                  (this.isTokenValid = !1),
                  this.closePromise &&
                    (this.closePromise.resolve(), (this.closePromise = null)),
                  (this.openPromise = null),
                  this.dispatcher.trigger(xe.Close, e);
              }
              onMessage(e) {
                try {
                  const t = JSON.parse(e.data);
                  !(function (e) {
                    return e.state && e.state.type && "pong" === e.state.type;
                  })(t)
                    ? (this.dispatcher.trigger(xe.Message, t),
                      this.dispatcher.trigger(xe.MessageReceived, t))
                    : (this.isHeartBeatAlive = !0);
                } catch (e) {
                  this.onError(e);
                }
              }
              onError(e) {
                this.dispatcher.trigger(xe.Error, e);
              }
              initHeartBeat() {
                return ke.setInterval(() => {
                  this.send(Te).then(() => {
                    (this.isHeartBeatAlive = !1),
                      (this.pongMonitor = ke.setTimeout(() => {
                        this.isOpen() && !this.isHeartBeatAlive && Le(this);
                      }, 1e4));
                  });
                }, 3e4);
              }
              stopMonitors() {
                clearTimeout(this.refreshMonitor),
                  clearInterval(this.heartBeatMonitor),
                  clearTimeout(this.pongMonitor);
              }
            }
            function Le(e) {
              e.close().then(() => e.open());
            }
            class Oe {
              constructor(e) {
                (this.options = e),
                  e.isLongPoll &&
                    ((this.options.retryInterval = 2e3),
                    (this.options.retryMaxAttempts = 5)),
                  (this.dispatcher = Ce()),
                  (this.wsConnection = new Me({
                    authService: e.authService,
                    url: (0, o.getWebSocketURL)(
                      e.baseURL,
                      e.searchParams,
                      e.isTLS,
                      e.channel
                    ),
                    retryInterval: e.retryInterval,
                    retryMaxAttempts: e.retryMaxAttempts,
                    dispatcher: this.dispatcher,
                  })),
                  (this.currentConnection = this.wsConnection);
              }
              open() {
                return this.options.isLongPoll
                  ? new Promise((e, t) => {
                      this.wsConnection
                        .open()
                        .then(() => {
                          this.useWS(e);
                        })
                        .catch(() => {
                          this.useLongPoll(e, t);
                        });
                    })
                  : this.currentConnection.open();
              }
              close() {
                return (
                  clearTimeout(this.upgradeToWebSocketMonitor),
                  this.currentConnection.close()
                );
              }
              send(e) {
                return this.currentConnection.send(e);
              }
              isOpen() {
                return this.currentConnection.isOpen();
              }
              isClosed() {
                return this.currentConnection.isClosed();
              }
              getState() {
                return this.currentConnection.getState();
              }
              updateConnectionUrl(e) {
                var t;
                this.wsConnection.updateConnectionUrl(e),
                  (this.options = Object.assign(
                    Object.assign({}, this.options),
                    {
                      baseURL: e.URI,
                      searchParams: {
                        channelId: e.channelId,
                        userId: e.userId,
                      },
                      isTLS: e.isTLS,
                      channel: e.channel,
                    }
                  )),
                  null === (t = this.longPollConnection) ||
                    void 0 === t ||
                    t.updateConnectionUrl(e);
              }
              on(e, t) {
                this.dispatcher.bind(e, t);
              }
              off(e, t) {
                this.dispatcher.unbind(e, t);
              }
              useWS(e) {
                var t;
                (this.currentConnection = this.wsConnection),
                  clearTimeout(this.upgradeToWebSocketMonitor),
                  (null === (t = this.longPollConnection) || void 0 === t
                    ? void 0
                    : t.isOpen()) && this.longPollConnection.close(),
                  e();
              }
              useLongPoll(e, t) {
                (this.currentConnection = this.getLongPollConnection()),
                  this.currentConnection
                    .open()
                    .then(() => {
                      (this.upgradeToWebSocketMonitor =
                        this.initUpgradeToWebSocketTimer()),
                        e();
                    })
                    .catch((e) => {
                      t(e);
                    });
              }
              getLongPollConnection() {
                return (
                  this.longPollConnection ||
                    (this.longPollConnection = new Ae({
                      url: (0, o.getLongPollURL)(
                        this.options.baseURL,
                        this.options.searchParams,
                        this.options.isTLS
                      ),
                      authService: this.options.authService,
                      dispatcher: this.dispatcher,
                    })),
                  this.longPollConnection
                );
              }
              initUpgradeToWebSocketTimer() {
                return window.setTimeout(this.open.bind(this), 3e5);
              }
            }
            const Pe = { isLongPoll: !1, isTLS: !0 };
            function De(e) {
              const t = !1;
              if ((n = e) && "object" == typeof n && "messagePayload" in n) {
                const n = e.messagePayload;
                if (we(n)) {
                  if (n.actions && !Re(n.actions)) return t;
                  if (n.globalActions && !Re(n.globalActions)) return t;
                  switch (n.type) {
                    case Y.Attachment:
                      return (function (e) {
                        const t = e.attachment;
                        return !!(t && t.type && t.url);
                      })(n);
                    case Y.Card:
                      return (function (e) {
                        let t = !1;
                        if (e.layout && e.cards.length) {
                          t = !0;
                          for (const t of e.cards) {
                            if (!t.title) return !1;
                            if (t.actions && !Re(t.actions)) return !1;
                          }
                        }
                        return t;
                      })(n);
                    case Y.CloseSession:
                    case Y.SessionClosed:
                      return !0;
                    case Y.Location:
                      return (function (e) {
                        const t = e.location;
                        return !!(t && t.latitude && t.longitude);
                      })(n);
                    case Y.Postback:
                      return (function (e) {
                        return !!e.postback;
                      })(n);
                    case Y.Text:
                      return (function (e) {
                        return !!e.text;
                      })(n);
                    case Y.Table:
                      return Be(n);
                    case Y.Form:
                      return Ne(n);
                    case Y.TableForm:
                      return (function (e) {
                        return Be(e) && Ne(e);
                      })(n);
                  }
                }
              }
              var n;
              return t;
            }
            function Re(e) {
              for (const t of e)
                if (!t.type || !t.label || "string" != typeof t.label)
                  return !1;
              return !0;
            }
            function Be(e) {
              const t = e.headings,
                n = e.rows;
              return (
                t &&
                t.length > 0 &&
                n &&
                n.length > 0 &&
                t.every((e) => Ve(e)) &&
                n.every((e) => ze(e))
              );
            }
            function Ne(e) {
              const t = e.forms,
                n = e.formColumns;
              return (
                t &&
                t.length > 0 &&
                t.every((e) => ze(e)) &&
                (1 === n || 2 === n)
              );
            }
            function Ve(e) {
              const t = e.label;
              return void 0 !== t && t.length > 0;
            }
            function ze(e) {
              const t = e.fields;
              return (
                t &&
                t.length > 0 &&
                t.every((e) =>
                  (function (e) {
                    const t = e.displayType;
                    return t && ("link" === t || "text" === t) && Ve(e);
                  })(e)
                )
              );
            }
            class Fe {
              constructor(e) {
                (this.areNewConnectionParamsPassed = (e, t, n) => {
                  let o = !1;
                  return (
                    ((e && e !== this.config.URI) ||
                      (t && t !== this.config.channelId) ||
                      (n && n !== this.config.userId)) &&
                      (o = !0),
                    o
                  );
                }),
                  (this.updateConnectionParams = (e, t, n) =>
                    new Promise((o, i) => {
                      e &&
                        "string" == typeof e &&
                        e.length &&
                        (this.config.URI = e),
                        this.authService
                          ? this.authService
                              .get()
                              .then((e) => {
                                (this.config.channelId =
                                  e.getClaim("channelId")),
                                  (this.config.userId = e.getClaim("userId")),
                                  this.connection.updateConnectionUrl({
                                    URI: this.config.URI,
                                    channelId: this.config.channelId,
                                    userId: this.config.userId,
                                    isTLS: this.config.isTLS,
                                    channel: this.config.channel,
                                  }),
                                  o();
                              })
                              .catch((e) => i(e))
                          : ("string" == typeof t &&
                              t.length &&
                              (this.config.channelId = t),
                            "string" == typeof n &&
                              n.length &&
                              (this.config.userId = n),
                            this.connection.updateConnectionUrl({
                              URI: this.config.URI,
                              channelId: this.config.channelId,
                              userId: this.config.userId,
                              isTLS: this.config.isTLS,
                              channel: this.config.channel,
                            }),
                            o());
                    })),
                  (this.config = Object.assign(Object.assign({}, Pe), e)),
                  this.config.tokenGenerator &&
                    (this.authService = o.AuthTokenService.getInstance()),
                  (this.connection = new Oe({
                    baseURL: this.config.URI,
                    isLongPoll: this.config.isLongPoll,
                    isTLS: this.config.isTLS,
                    channel: this.config.channel,
                    retryInterval: 2e4,
                    retryMaxAttempts:
                      void 0 !== this.config.retryMaxAttempts &&
                      this.config.retryMaxAttempts >= 0
                        ? this.config.retryMaxAttempts
                        : 5,
                    searchParams: {
                      channelId: this.config.channelId,
                      userId: this.config.userId,
                    },
                    authService: this.authService,
                  })),
                  window.addEventListener("online", () => this.open()),
                  window.addEventListener("offline", () => this.close());
              }
              open(e) {
                const { URI: t, userId: n, channelId: o } = e || {};
                if (this.isOpen()) {
                  if (this.areNewConnectionParamsPassed(t, o, n)) {
                    const e = t && this.config.URI !== t;
                    return !this.authService || e
                      ? this.close().then(() =>
                          this.updateConnectionParams(t, o, n).then(() =>
                            this.connection.open()
                          )
                        )
                      : Promise.resolve();
                  }
                  return Promise.resolve();
                }
                return this.updateConnectionParams(t, o, n).then(() =>
                  this.connection.open()
                );
              }
              close() {
                return this.connection.close();
              }
              isOpen() {
                return this.connection.isOpen();
              }
              send(e, t, n) {
                let o;
                return (
                  (o =
                    "string" == typeof e
                      ? se(e, t)
                      : ye(e)
                      ? ce(e)
                      : we(e)
                      ? le(e)
                      : e),
                  De(o)
                    ? ((null == n ? void 0 : n.sdkMetadata) &&
                        (o = this.updateMetadata(o, n.sdkMetadata)),
                      (o.userId = this.config.userId),
                      this.connection.send(o))
                    : te(Z.MessageInvalid)
                );
              }
              updateUser(e, t) {
                let n = e;
                return (
                  (null == t ? void 0 : t.sdkMetadata) &&
                    (n = this.updateMetadata(e, t.sdkMetadata)),
                  this.connection.send(n)
                );
              }
              getSuggestions(e) {
                var t;
                const n = {
                  messagePayload: { query: e, threshold: 30, type: Y.Suggest },
                };
                return (
                  (this.suggestionPromise = new o.Deferred()),
                  this.connection.send(n),
                  setTimeout(() => {
                    var e;
                    null === (e = this.suggestionPromise) ||
                      void 0 === e ||
                      e.reject(ee(Z.SuggestionsTimeout));
                  }, 1e4),
                  null === (t = this.suggestionPromise) || void 0 === t
                    ? void 0
                    : t.promise
                );
              }
              on(e, t) {
                switch (e) {
                  case j.MessageReceived:
                    this.connection.on(xe.MessageReceived, (e) => {
                      var n;
                      e.suggestions && this.suggestionPromise
                        ? null === (n = this.suggestionPromise) ||
                          void 0 === n ||
                          n.resolve(e.suggestions)
                        : t(e);
                    });
                    break;
                  case j.MessageSent:
                    this.connection.on(xe.MessageSent, t);
                    break;
                  case j.State:
                    this.connection.on(xe.State, t);
                    break;
                  case j.Open:
                    this.connection.on(xe.Open, t);
                    break;
                  case j.Close:
                    this.connection.on(xe.Close, t);
                }
              }
              off(e, t) {
                this.connection.off(e, t);
              }
              updateMetadata(e, t) {
                return (
                  t &&
                    (e.sdkMetadata = Object.assign(
                      Object.assign({}, e.sdkMetadata),
                      t
                    )),
                  e
                );
              }
            }
            const Ue = 25,
              He = 1024 * Ue * 1024;
            class je {
              static getInstance() {
                return this.service || (this.service = new je()), this.service;
              }
              setParams(e) {
                (this.params = e),
                  (this.URL = (function (e, t, n) {
                    const i = `http${n ? "s" : ""}://`;
                    return (0, o.buildURL)(i, e, t, "/chat/v1/attachments");
                  })(
                    e.URI,
                    { channelId: e.channelId, userId: e.userId },
                    e.isTLS
                  ));
              }
              upload(e, t) {
                return new Promise((n, i) => {
                  const r = e.size;
                  if (0 === r) return void i(Error(Z.UploadZeroSize));
                  if (r > He) return void i(Error(Z.UploadMaxSize));
                  const a = new XMLHttpRequest(),
                    s = () => i(Error(Z.UploadNetworkFail));
                  X(a, "readystatechange", () => {
                    if (4 === a.readyState)
                      switch (a.status) {
                        case 200: {
                          const e = JSON.parse(a.responseText);
                          n(e);
                          break;
                        }
                        case 413:
                          i(Error(Z.UploadMaxSize));
                          break;
                        case 415:
                          i(Error(Z.UploadBadFile));
                          break;
                        default:
                          s();
                      }
                  }),
                    X(a, "abort", s),
                    X(a, "error", s),
                    X(a, "timeout", s),
                    this.params.tokenGenerator
                      ? o.AuthTokenService.getInstance()
                          .get()
                          .then((n) =>
                            this.send(a, {
                              file: e,
                              options: t,
                              token: n.token,
                            })
                          )
                          .catch((e) => i(e))
                      : this.send(a, { file: e, options: t });
                });
              }
              send(e, { file: t, options: n, token: o }) {
                const i = new FormData();
                i.append("attachment", t, encodeURI(t.name)),
                  e.open("POST", this.URL),
                  J(e, "x-oda-meta-file-size", t.size.toString()),
                  o &&
                    (J(e, "Authorization", `Bearer ${o}`),
                    this.params.enableAttachmentSecurity &&
                      (J(e, "x-oda-meta-file-isProtected", "True"),
                      J(e, "x-oda-meta-file-authType", "ChannelClientAuth"))),
                  e.send(i),
                  n && n.onInitUpload && n.onInitUpload(e);
              }
            }
            const We = {
              AUDIO:
                ".aac, .amr, .m4a, .mp3, .mp4a, .mpga, .oga, .ogg, .wav, audio/*",
              FILE: ".7z, .csv, .doc, .docx, .eml, .ics, .key, .log, .msg, .neon, .numbers, .odt, .pages, .pdf, .pps, .ppsx, .ppt, .pptx, .rtf, .txt, .vcf, .xls, .xlsx, .xml, .yml, .yaml, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document",
              IMAGE:
                ".gif, .jfif, .jpeg, .jpg, .png, .svg, .tif, .tiff, .webp, image/*",
              VIDEO:
                ".3g2, .3gp, .avi, .m4v, .mov, .mp4, .mpeg, .mpg, .ogv, .qt, .webm, .wmv, video/*",
              ALL: "",
            };
            We.ALL = `${We.AUDIO},${We.FILE},${We.IMAGE},${We.VIDEO}`;
            class Ge {
              constructor(e) {
                (this.recognizedText = null),
                  this.initServices(e),
                  (this.chatService = new Fe(e)),
                  this.chatService.on(j.Open, () => {
                    this.uploadService && this.uploadService.setParams(e),
                      this.recognitionService &&
                        this.recognitionService.setConfig(e);
                  });
              }
              connect(e) {
                return this.chatService.open(e);
              }
              disconnect() {
                const e = this.chatService.close();
                return e.then(this.onChatServiceClose.bind(this)), e;
              }
              isConnected() {
                return this.chatService.isOpen();
              }
              sendMessage(e, t) {
                if (!e) return te(Z.MessageInvalid);
                let n = "",
                  o = "";
                return (
                  "string" == typeof e ? (o = e) : we(e) && (o = e.text),
                  this.recognizedText &&
                    this.recognizedText.text === o &&
                    (n = this.recognizedText.requestId),
                  (this.recognizedText = null),
                  this.chatService.send(e, n, t)
                );
              }
              updateUser(e, t) {
                return (n = e) &&
                  "profile" in n &&
                  "object" == typeof n.profile &&
                  null !== n.profile
                  ? this.chatService.updateUser(e, t)
                  : te(Z.ProfileInvalid);
                var n;
              }
              sendAttachment(e, t) {
                return this.isConnected()
                  ? this.uploadService
                    ? this.uploadService
                        .upload(e, t)
                        .then((e) => ae(e.type, e.url))
                        .then((e) =>
                          this.chatService.send(e, "", {
                            sdkMetadata: null == t ? void 0 : t.sdkMetadata,
                          })
                        )
                    : te(Z.UploadNotAvailable)
                  : te(Z.ConnectionNone);
              }
              sendLocation(e) {
                return this.isConnected()
                  ? e
                    ? (function (e) {
                        const { latitude: t, longitude: n } = e;
                        return (
                          ie(t) && ie(n) && re(t, -90, 90) && re(n, -180, 180)
                        );
                      })(e)
                      ? this.chatService.send({
                          messagePayload: { type: Y.Location, location: e },
                        })
                      : te(Z.LocationInvalid)
                    : (oe
                        ? new Promise((e, t) => {
                            oe.getCurrentPosition(
                              (t) => {
                                e(t.coords);
                              },
                              (e) => {
                                let n;
                                switch (e.code) {
                                  case e.POSITION_UNAVAILABLE:
                                    n = Z.LocationNotAvailable;
                                    break;
                                  case e.TIMEOUT:
                                    n = Z.LocationTimeout;
                                    break;
                                  case e.PERMISSION_DENIED:
                                  default:
                                    n = Z.LocationNoAPI;
                                }
                                t(ee(n));
                              },
                              { enableHighAccuracy: !0, timeout: 5e3 }
                            );
                          })
                        : te(Z.LocationNoAPI)
                      ).then((e) =>
                        this.chatService.send({
                          messagePayload: {
                            type: Y.Location,
                            location: {
                              latitude: e.latitude,
                              longitude: e.longitude,
                            },
                          },
                        })
                      )
                  : te(Z.ConnectionNone);
              }
              getSuggestions(e) {
                return e
                  ? "string" != typeof e
                    ? te(Z.SuggestionsInvalidRequest)
                    : this.chatService.getSuggestions(e)
                  : te(Z.SuggestionsEmptyRequest);
              }
              destroy() {
                this.disconnect();
                for (const e in this) this[e] && delete this[e];
              }
              setTTSService(e) {
                this.ttsService = e;
              }
              getTTSService() {
                return this.ttsService || d.getInstance();
              }
              getTTSVoices() {
                return this.ttsService
                  ? this.ttsService.getVoices()
                  : te(Z.TtsNotAvailable);
              }
              setTTSVoice(e) {
                return this.ttsService
                  ? this.ttsService.setVoice(e)
                  : te(Z.TtsNotAvailable);
              }
              getTTSVoice() {
                if (this.ttsService) return this.ttsService.getVoice();
                throw ee(Z.TtsNotAvailable);
              }
              speakTTS(e, t) {
                if (this.ttsService) {
                  let n;
                  if ("string" == typeof e) n = e;
                  else {
                    if (!De(e)) return;
                    n = fe(e, t);
                  }
                  this.ttsService.speak(n);
                }
              }
              cancelTTS() {
                this.ttsService && this.ttsService.cancel();
              }
              startRecognition(e) {
                return this.recognitionService
                  ? this.isConnected()
                    ? this.recognitionService.startRecognition(
                        Object.assign(Object.assign({}, e), {
                          onRecognitionText: (t) => {
                            "final" === t.type && (this.recognizedText = t),
                              e.onRecognitionText(t);
                          },
                        })
                      )
                    : te(Z.ConnectionNone)
                  : te(Z.RecognitionNotAvailable);
              }
              stopRecognition() {
                return this.recognitionService
                  ? this.recognitionService.stopRecognition()
                  : te(Z.RecognitionNotAvailable);
              }
              setRecognitionLocale(e) {
                if (e && "string" == typeof e && this.recognitionService) {
                  const t = e.toLowerCase();
                  this.recognitionService.setLocale(t);
                }
              }
              on(e, t) {
                this.chatService.on(e, t);
              }
              getAuthToken() {
                var e;
                return null === (e = this.authService) || void 0 === e
                  ? void 0
                  : e.get();
              }
              onChatServiceClose() {
                console.log("The chat service is closed.");
              }
              initServices(e) {
                (e.URI = e.URI.replace(
                  /^https?:\/\//gi,
                  (e) => (console.warn(`Please remove "${e}" from URI.`), "")
                )),
                  this.initAttachmentService(e),
                  this.initAuthService(e),
                  this.initTTSService(e),
                  (this.recognitionService = N.getInstance());
              }
              initAttachmentService(e) {
                e.enableAttachment && (this.uploadService = je.getInstance());
              }
              initAuthService(e) {
                e.tokenGenerator &&
                  ((this.authService = o.AuthTokenService.getInstance()),
                  this.authService.setFetch(e.tokenGenerator));
              }
              initTTSService(e) {
                if (e.isTTS) {
                  if (e.TTSService)
                    return void (this.ttsService = e.TTSService);
                  try {
                    this.ttsService = d.getInstance();
                  } catch (e) {}
                }
              }
            }
          },
          4733: function (e, t, n) {
            n.r(t),
              n.d(t, {
                style: function () {
                  return o;
                },
              });
            const o =
              '@keyframes scale-in-center{0%{opacity:1;transform:scale(0)}100%{opacity:1;transform:scale(1)}}@keyframes scale-out-center{0%{display:flex;opacity:1;transform:scale(1)}100%{display:none;opacity:1;transform:scale(0)}}@keyframes scale-in-br{0%{opacity:1;transform:scale(0);transform-origin:100% 100%}100%{opacity:1;transform:scale(1);transform-origin:100% 100%}}@keyframes scale-in-bl{0%{opacity:1;transform:scale(0);transform-origin:0 100%}100%{opacity:1;transform:scale(1);transform-origin:0 100%}}@keyframes scale-in-tl{0%{opacity:1;transform:scale(0);transform-origin:0 0}100%{opacity:1;transform:scale(1);transform-origin:0 0}}@keyframes scale-in-tr{0%{opacity:1;transform:scale(0);transform-origin:100% 0}100%{opacity:1;transform:scale(1);transform-origin:100% 0}}@keyframes scale-out-br{0%{opacity:1;transform:scale(1);transform-origin:100% 100%}99%{opacity:1;transform:scale(0.01);transform-origin:100% 100%}100%{display:none;opacity:1;transform:scale(0);transform-origin:100% 100%}}@keyframes scale-out-bl{0%{opacity:1;transform:scale(1);transform-origin:0 100%}99%{opacity:1;transform:scale(0.01);transform-origin:0 100%}100%{display:none;opacity:1;transform:scale(0);transform-origin:0 100%}}@keyframes popup-suggestion{0%{box-shadow:0 0 0 0 rgba(0,0,0,0),0 0 0 0 rgba(0,0,0,0);transform:scaleY(0.4);transform-origin:0 100%}100%{box-shadow:0 -12px 15px -12px rgba(0,0,0,.35);transform:scaleY(1);transform-origin:0 100%}}@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}@keyframes banner-in{0%{transform:translateY(-20px);opacity:0}100%{transform:translateY(0);opacity:1}}@keyframes banner-out{0%{transform:translateY(0);opacity:1}100%{transform:translateY(-20px);opacity:0}}@keyframes typing-cue{0%{background-color:rgba(22,21,19,.4)}50%,100%{background-color:rgba(22,21,19,.1)}}@keyframes oda-chat-webview-slide-out-bottom{0%{transform:translateY(0);opacity:1}95%{opacity:1}100%{transform:translateY(100%);opacity:0}}@keyframes oda-chat-webview-slide-in-bottom{0%{transform:translateY(100%);opacity:0}1%{opacity:1}100%{transform:translateY(0%);opacity:1}}.flex{display:flex;justify-content:space-between;align-items:center}.flex.col{flex-direction:column}.none{display:none}.wrapper{--color-branding: #c0533f;--color-text: #161513;--color-text-light: #161513;--color-header-background: #F1EFED;--color-header-button-fill: #161513;--color-header-text: #161513;--color-header-button-background-hover: rgba(22, 21, 19, 0.04);--color-header-button-fill-hover: #161513;--color-conversation-background: #F5F4F2;--color-timestamp: rgba(22, 21, 19, 0.65);--color-typing-indicator: #161513;--color-bot-message-background: #FFFFFF;--color-bot-text: #161513;--color-user-message-background: #E4E1DD;--color-user-text: #161513;--color-error-message-background: #FFF8F7;--color-error-border: #DC5C5E;--color-error-title: #D63B25;--color-error-text: #161513;--color-card-background: #655f5c;--color-card-nav-button: #FFF;--color-card-nav-button-focus: #FBF9F8;--color-card-nav-button-hover: #FBF9F8;--color-actions-background: #fff;--color-actions-background-focus: rgba(22, 21, 19, 0.04);--color-actions-background-hover: rgba(22, 21, 19, 0.04);--color-actions-border: rgba(22, 21, 19, 0.5);--color-actions-text: #161513;--color-actions-text-focus: #161513;--color-actions-text-hover: #161513;--color-global-actions-background: transparent;--color-global-actions-background-focus: rgba(22, 21, 19, 0.04);--color-global-actions-background-hover: rgba(22, 21, 19, 0.04);--color-global-actions-border: rgba(22, 21, 19, 0.5);--color-global-actions-text: #161513;--color-global-actions-text-focus: #161513;--color-global-actions-text-hover: #161513;--color-links: #c0533f;--color-rating-star: #ececec;--color-rating-star-fill: #f0cc71;--color-horizontal-rule-background: #cbc5bf;--color-attachment-placeholder: #e3e1dc;--color-attachment-footer: #fff;--color-attachment-text: #161513;--color-footer-background: #fff;--color-footer-button-fill: #161513;--color-footer-button-background-hover: rgba(22, 21, 19, 0.04);--color-footer-button-fill-hover: #161513;--color-input-background: #fff;--color-input-border: #dadada;--color-input-text: #161513;--color-recognition-view-text: #fff;--color-visualizer: #161513;--color-visualizer-container-background: #fff;--color-notification-badge-background: #312d2a;--color-notification-badge-text: #fff;--color-popup-background: #fff;--color-popup-text: #161513;--color-popup-button-background: #fff;--color-popup-button-text: #161513;--color-popup-horizontal-rule: #cbc5bf;--color-popup-item-background-hover: rgba(22, 21, 19, 0.04);--color-table-header-background: #f1efec;--color-table-background: #fff;--color-table-text: #161513;--color-table-separator: rgba(22, 21, 19, 0.1);--color-row-item-background-hover: rgba(22, 21, 19, 0.04);--width-full-screen: 375px;position:fixed;bottom:20px;right:20px;box-sizing:border-box;text-transform:none;z-index:10000;color:var(--color-text);font-family:"Oracle Sans",-apple-system,BlinkMacSystemFont,"Segoe UI","Helvetica Neue",sans-serif;transition:all .25s ease-in-out;-webkit-font-smoothing:antialiased}.wrapper.classic{--color-branding: #025e7e;--color-text: #161513;--color-text-light: #3a3631;--color-header-background: #025e7e;--color-header-button-fill: #fff;--color-header-button-fill-hover: #fff;--color-header-text: #fff;--color-conversation-background: #fff;--color-timestamp: #5b5652;--color-typing-indicator: #227e9e;--color-bot-message-background: #e5f1ff;--color-user-message-background: #ececec;--color-card-background: #fcfbfa;--color-card-nav-button: #4190ac;--color-card-nav-button-focus: #5fa2ba;--color-card-nav-button-hover: #0e7295;--color-actions-background: #025e7e;--color-actions-background-focus: #053242;--color-actions-background-hover: #06485f;--color-actions-border: #025e7e;--color-actions-text: #fff;--color-actions-text-focus: #fff;--color-actions-text-hover: #fff;--color-global-actions-background: #fff;--color-global-actions-background-focus: #053242;--color-global-actions-background-hover: #025e7e;--color-global-actions-border: #0e7295;--color-global-actions-text: #0e7295;--color-global-actions-text-focus: #fff;--color-global-actions-text-hover: #fff;--color-links: #0e7295;--color-attachment-footer: #e5f1ff;--color-footer-background: #fff;--color-footer-button-fill: #161513;--color-footer-button-fill-hover: #025e7e;--color-visualizer: #025e7e;--color-notification-badge-background: #9a0007;--color-notification-badge-text: #fff;--color-popup-button-text: #025e7e}.wrapper.redwood-dark{--color-branding: #c0533f;--color-text: #161513;--color-text-light: #fcfbfa;--color-header-background: #201e1c;--color-header-button-fill: #fff;--color-header-button-fill-hover: #fff;--color-header-button-background-hover: rgba(255, 255, 255, 0.04);--color-header-text: #fff;--color-conversation-background: #3a3631;--color-timestamp: #fcfbfa;--color-typing-indicator: #fff;--color-bot-message-background: #655f5c;--color-bot-text: #fff;--color-user-message-background: #fff;--color-user-text: #161513;--color-card-background: #655f5c;--color-card-nav-button: #d5b364;--color-card-nav-button-focus: #f7e0a1;--color-card-nav-button-hover: #b39554;--color-actions-background: #655f5c;--color-actions-background-focus: rgba(22, 21, 19, 0.5);--color-actions-background-hover: rgba(22, 21, 19, 0.3);--color-actions-border: #fff;--color-actions-text: #fff;--color-actions-text-focus: #fff;--color-actions-text-hover: #fff;--color-global-actions-background: #3a3631;--color-global-actions-background-focus: rgba(22, 21, 19, 0.3);--color-global-actions-background-hover: rgba(22, 21, 19, 0.3);--color-global-actions-border: #fff;--color-global-actions-text: #fff;--color-global-actions-text-focus: #fff;--color-global-actions-text-hover: #fff;--color-links: #c0533f;--color-footer-background: #fff;--color-footer-button-fill: #161513;--color-input-background: #fff;--color-input-text: #161513;--color-recognition-view-text: #fff;--color-visualizer-container-background: #fff;--color-notification-badge-background: #312d2a;--color-notification-badge-text: #fff;--color-popup-button-text: #201e1c}.wrapper *{box-sizing:border-box}.wrapper .widget{position:absolute;bottom:0;border-radius:6px 6px 0 0;box-shadow:0px -4px 32px rgba(0,0,0,.1);right:0;min-width:300px;height:85vh;max-height:calc(100vh - 60px);margin:0;overflow:hidden;text-decoration:none;text-transform:none;z-index:10000;align-items:stretch;background:var(--color-conversation-background)}.wrapper .widget .alert-wrapper{position:absolute;top:48px;width:100%}.wrapper .widget .alert-wrapper .alert-prompt{position:relative;left:0;right:0;width:auto;margin:6px;padding:10px;border-radius:10px;z-index:11}.wrapper .widget .msg-icon{padding:5px 10px 0 0}.wrapper .widget .msg{flex-grow:1}.wrapper button{position:relative;padding:9px 16px;margin:0 0 8px;min-height:36px;line-height:16px;font-size:13.75px;font-weight:600;font-family:inherit;border-radius:4px;border-width:thin;border-style:solid;cursor:pointer;overflow:hidden;word-break:break-word}.wrapper button:disabled{opacity:.5;cursor:not-allowed}.wrapper button.icon{width:36px;height:36px;padding:0;margin:0;margin-inline-start:4px;border:none;border-radius:4px;color:var(--color-text);background-color:transparent;justify-content:center}.wrapper button img{width:20px;height:20px}.wrapper button .action-image{margin-inline-end:10px}.wrapper .button{position:absolute;right:0;bottom:0;height:48px;width:48px;padding:0;margin:0;border:none;background-position:center center;background-repeat:no-repeat;cursor:pointer;justify-content:center;align-items:center;z-index:10000;color:var(--color-text);background-color:var(--color-branding);border-radius:0;overflow:visible}.wrapper .button:not(:disabled):hover,.wrapper .button:not(:disabled):focus,.wrapper .button:not(:disabled):active{background-color:var(--color-branding)}.wrapper .header{height:56px;padding:0 8px;background-color:var(--color-header-background);color:var(--color-header-text)}.wrapper .header .logo{flex:0 0 auto;width:36px;max-width:100px;height:36px;max-height:36px;overflow:hidden;padding:0}.wrapper .header .header-info-wrapper{flex-direction:column;flex-wrap:nowrap;width:100%;min-width:0;padding:0;margin:0 8px}.wrapper .header .header-info-wrapper .title{max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:1.125em;font-weight:700}.wrapper .header .header-info-wrapper .subtitle{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.wrapper .header .header-info-wrapper .connection-status{font-weight:bold;font-size:10px;justify-content:center;padding:0;margin:0;text-transform:uppercase;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.wrapper .header .header-gap{flex:auto}.wrapper .header-actions{flex:1 0 auto;justify-content:flex-end;flex-direction:inherit}.wrapper .header-actions .header-button svg>path{fill:var(--color-header-button-fill)}.wrapper .header-actions .header-button:not(:disabled):hover,.wrapper .header-actions .header-button:not(:disabled):focus{background-color:var(--color-header-button-background-hover)}.wrapper .header-actions .header-button:not(:disabled):hover svg>path,.wrapper .header-actions .header-button:not(:disabled):focus svg>path{fill:var(--color-header-button-fill-hover)}.wrapper .conversation{display:flex;flex-direction:column-reverse;flex:1;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column-reverse;overflow-x:hidden;overflow-y:auto;scroll-behavior:smooth;width:100%;padding:16px}.wrapper .conversation .conversation-pane .message-date,.wrapper .conversation .conversation-pane .relative-timestamp{font-size:12px;margin:8px 0 8px;color:var(--color-timestamp);text-align:start}.wrapper .conversation .conversation-pane .message-date.right,.wrapper .conversation .conversation-pane .relative-timestamp.right{text-align:end}.wrapper .conversation .conversation-pane.bot-icon .message.card-message-horizontal{margin-inline-start:-56px}.wrapper .conversation .conversation-pane.bot-icon .message.card-message-horizontal .message-header,.wrapper .conversation .conversation-pane.bot-icon .message.card-message-horizontal .message-footer{margin-inline-start:56px}.wrapper .conversation .conversation-pane.bot-icon .message.card-message-horizontal .card-message-content .card-message-cards{padding-inline-start:56px}.wrapper .conversation .conversation-pane.bot-icon .message.card-message-horizontal .message-global-actions{margin-inline-start:56px}.wrapper .conversation .conversation-pane.bot-icon .relative-timestamp.left{margin-inline-start:40px}.wrapper .conversation .conversation-pane.user-icon .relative-timestamp.right{margin-inline-end:40px}.wrapper .conversation .conversation-pane.bot-icon .message-block .messages-wrapper,.wrapper .conversation .conversation-pane.user-icon .message-block .messages-wrapper{max-width:calc(0.9 * (100% - 40px))}.wrapper .conversation .conversation-pane.bot-icon .message-block .messages-wrapper .message.card-message-horizontal .message-header,.wrapper .conversation .conversation-pane.bot-icon .message-block .messages-wrapper .message.card-message-horizontal .message-footer,.wrapper .conversation .conversation-pane.user-icon .message-block .messages-wrapper .message.card-message-horizontal .message-header,.wrapper .conversation .conversation-pane.user-icon .message-block .messages-wrapper .message.card-message-horizontal .message-footer{max-width:calc(0.9 * (100% - 72px))}.wrapper .conversation .conversation-pane.bot-icon .message-block .messages-wrapper .message.card-message-horizontal .message-global-actions button,.wrapper .conversation .conversation-pane.user-icon .message-block .messages-wrapper .message.card-message-horizontal .message-global-actions button{max-width:calc(0.9 * (100% - 56px))}.wrapper .conversation .conversation-pane.bot-icon.bot-icon .message-block .messages-wrapper,.wrapper .conversation .conversation-pane.user-icon.bot-icon .message-block .messages-wrapper{max-width:calc(0.9 * (100% - 80px))}.wrapper .conversation .conversation-pane.bot-icon.bot-icon .message-block .messages-wrapper .message.card-message-horizontal .message-header,.wrapper .conversation .conversation-pane.bot-icon.bot-icon .message-block .messages-wrapper .message.card-message-horizontal .message-footer,.wrapper .conversation .conversation-pane.user-icon.bot-icon .message-block .messages-wrapper .message.card-message-horizontal .message-header,.wrapper .conversation .conversation-pane.user-icon.bot-icon .message-block .messages-wrapper .message.card-message-horizontal .message-footer{max-width:calc(0.9 * (100% - 112px))}.wrapper .timestamp-header{text-align:center;font-size:12px;font-weight:700;color:var(--color-timestamp);margin:16px 0}.wrapper .hr{margin:24px 0;font-size:12px;color:var(--color-horizontal-rule-background)}.wrapper .hr:before{content:"";background-color:var(--color-horizontal-rule-background);height:1px;flex-grow:1;margin-right:10px}.wrapper .hr:after{content:"";background-color:var(--color-horizontal-rule-background);height:1px;flex-grow:1;margin-left:10px}.wrapper .card-actions,.wrapper .message-actions,.wrapper .message-global-actions{margin-top:6px;align-items:flex-start;justify-content:flex-start}.wrapper .card-actions button:last-child,.wrapper .message-actions button:last-child,.wrapper .message-global-actions button:last-child{margin-bottom:0}.wrapper .action-postback{background:var(--color-actions-background);color:var(--color-actions-text);border-color:var(--color-actions-border)}.wrapper .action-postback:not(:disabled):hover{color:var(--color-actions-text-hover);background-color:var(--color-actions-background-hover)}.wrapper .action-postback:not(:disabled):hover svg>path{fill:var(--color-actions-text-hover)}.wrapper .action-postback:not(:disabled):focus,.wrapper .action-postback:not(:disabled):active{background-color:var(--color-actions-background-focus);color:var(--color-actions-text-focus)}.wrapper .action-postback:not(:disabled):focus svg>path,.wrapper .action-postback:not(:disabled):active svg>path{fill:var(--color-actions-text-focus)}.wrapper .message-global-actions{margin-top:8px}.wrapper .message-global-actions.stars{display:block}.wrapper .message-global-actions button{background:var(--color-global-actions-background);color:var(--color-global-actions-text);border-color:var(--color-global-actions-border)}.wrapper .message-global-actions button:not(:disabled):hover{background-color:var(--color-global-actions-background-hover);color:var(--color-global-actions-text-hover)}.wrapper .message-global-actions button:not(:disabled):hover svg>path{fill:var(--color-global-actions-text-hover)}.wrapper .message-global-actions button:not(:disabled):focus,.wrapper .message-global-actions button:not(:disabled):active{background-color:var(--color-global-actions-background-focus);color:var(--color-global-actions-text-focus)}.wrapper .message-global-actions button:not(:disabled):focus svg>path,.wrapper .message-global-actions button:not(:disabled):active svg>path{fill:var(--color-global-actions-text-focus)}.wrapper .message-bubble{position:relative;display:flex;flex-direction:column;align-items:flex-start;margin:0;padding:6px 16px;color:var(--color-bot-text);background:var(--color-bot-message-background);overflow:hidden;min-height:32px;line-height:20px;overflow-wrap:break-word;max-width:100%;border-radius:2px 10px 10px 2px;margin-top:2px}.wrapper .message-bubble>*{width:100%}.wrapper .message-bubble a{color:var(--color-links)}.wrapper .message-bubble .youtube-wrapper{margin:-6px -16px -11px}.wrapper .message-bubble.error{background-color:var(--color-error-message-background);color:var(--color-error-text);border:1px dashed var(--color-error-border)}.wrapper .message-bubble.error .message-icon path{fill:var(--color-error-title)}.wrapper .message-bubble.error .message-title{color:var(--color-error-title)}.wrapper .message-bubble .message-with-icon{display:flex;align-items:flex-start;justify-content:space-between}.wrapper .message-bubble .message-with-icon .message-icon{width:24px;height:24px;align-items:center;margin-inline-end:16px}.wrapper .message-bubble .message-with-icon .message-text{word-break:break-word}.wrapper .message-bubble.message-header{margin-bottom:2px}.wrapper .message-bubble.message-footer{margin-top:2px}.wrapper .messages-wrapper{max-width:90%;align-items:flex-start}.wrapper .messages-wrapper .message-list{width:100%;align-items:flex-start}.wrapper .messages-wrapper .message-list .message{width:100%}.wrapper .messages-wrapper .message-list .message .screen-reader-only{height:1px;left:-20000px;overflow:hidden;position:absolute;top:auto;width:1px}.wrapper .messages-wrapper .message-list .message button.anchor-btn{padding:0}.wrapper .messages-wrapper .message-list .message button.anchor-btn a{display:block;text-decoration:inherit;color:inherit;padding:10px 20px}.wrapper .messages-wrapper .message-list .message button:last-child{margin-bottom:0}.wrapper .messages-wrapper .message-list .message .message-wrapper{display:flex;align-items:flex-start;flex-direction:column;width:100%;max-width:100%}.wrapper .messages-wrapper .message-list .message:first-child .message-bubble:not(.message-footer){margin-top:0}.wrapper .messages-wrapper .message-list .message:last-child .message-bubble:last-child{border-radius:2px 10px 10px 10px}.wrapper .messages-wrapper .message-list .message.card-message-horizontal{margin-inline-start:-16px;width:var(--width-full-screen)}.wrapper .messages-wrapper .message-list .message.card-message-horizontal.carousel{margin-top:8px}.wrapper .messages-wrapper .message-list .message.card-message-horizontal .message-header,.wrapper .messages-wrapper .message-list .message.card-message-horizontal .message-footer{margin-inline-start:16px}.wrapper .messages-wrapper .message-list .message.card-message-horizontal .card-message-cards{flex-direction:row;overflow-x:auto;padding:0 56px 0 16px}.wrapper .messages-wrapper .message-list .message.card-message-horizontal .card-message-cards .card{margin-bottom:0}.wrapper .messages-wrapper .message-list .message.card-message-horizontal .next-wrapper,.wrapper .messages-wrapper .message-list .message.card-message-horizontal .prev-wrapper{position:absolute;height:100%;top:0;width:52px;z-index:1}.wrapper .messages-wrapper .message-list .message.card-message-horizontal .next-wrapper{right:0;background:linear-gradient(90deg, rgba(255, 255, 255, 0), var(--color-conversation-background) 60%)}.wrapper .messages-wrapper .message-list .message.card-message-horizontal .prev-wrapper{left:0;background:linear-gradient(90deg, var(--color-conversation-background) 40%, rgba(255, 255, 255, 0))}.wrapper .messages-wrapper .message-list .message.card-message-horizontal .next,.wrapper .messages-wrapper .message-list .message.card-message-horizontal .previous{position:absolute;z-index:10;width:36px;height:36px;left:8px;padding:0;overflow:hidden;background-color:var(--color-card-nav-button);border:none;box-shadow:0px 2px 4px rgba(0,0,0,.1);top:calc(50% - 18px);justify-content:center}.wrapper .messages-wrapper .message-list .message.card-message-horizontal .next:hover,.wrapper .messages-wrapper .message-list .message.card-message-horizontal .previous:hover{background-color:var(--color-card-nav-button-hover)}.wrapper .messages-wrapper .message-list .message.card-message-horizontal .next:focus,.wrapper .messages-wrapper .message-list .message.card-message-horizontal .next:active,.wrapper .messages-wrapper .message-list .message.card-message-horizontal .previous:focus,.wrapper .messages-wrapper .message-list .message.card-message-horizontal .previous:active{background-color:var(--color-card-nav-button-focus)}.wrapper .messages-wrapper .message-list .message.card-message-horizontal .message-global-actions{margin-inline-start:16px}.wrapper .message-block{justify-content:flex-start;align-items:flex-start;margin-bottom:8px}.wrapper .message-block.right{flex-direction:row-reverse}.wrapper .message-block.right .icon-wrapper{margin:unset;margin-inline-start:8px}.wrapper .message-block.right .messages-wrapper{align-items:flex-end}.wrapper .message-block.right .messages-wrapper .message .message-wrapper{align-items:flex-end}.wrapper .message-block.right .messages-wrapper .message .message-bubble{border-radius:10px 2px 2px 10px}.wrapper .message-block.right .messages-wrapper .message .message-bubble:not(.error){color:var(--color-user-text);background:var(--color-user-message-background)}.wrapper .message-block.right .messages-wrapper .message:last-child .message-bubble:last-child{border-radius:10px 2px 10px 10px}.wrapper .message-block.right .message-date{text-align:right}.wrapper .icon-wrapper{margin-inline-end:8px;width:32px;min-width:32px;height:32px;border-radius:4px;overflow:hidden;z-index:1}.wrapper .icon-wrapper .message-icon{height:32px;max-height:32px;max-width:32px;width:32px}.wrapper .attachment{width:100%}.wrapper .attachment .attachment-placeholder{background-color:var(--color-attachment-placeholder);max-width:calc(100% + 32px);min-width:228px;min-height:88px;max-height:230px;margin:-6px -16px 0;justify-content:center;overflow:hidden}.wrapper .attachment .attachment-placeholder>*{max-width:100%}.wrapper .attachment .attachment-placeholder .attachment-icon{height:48px;width:48px}.wrapper .attachment .attachment-placeholder .attachment-icon svg{height:48px;width:48px}.wrapper .attachment .attachment-placeholder .attachment-icon img{width:100%}.wrapper .attachment .attachment-placeholder .attachment-audio{height:50px;width:100%}.wrapper .attachment .attachment-placeholder .attachment-audio::-webkit-media-controls-enclosure{background-color:transparent}.wrapper .attachment .attachment-footer{background-color:var(--color-attachment-footer);color:var(--color-attachment-text);margin:0 -16px -6px;height:50px;padding:16px}.wrapper .attachment .attachment-footer.with-actions{border-bottom:thin solid rgba(22,21,19,.1);margin-bottom:6px}.wrapper .attachment .attachment-footer .attachment-title{flex-grow:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.wrapper .card{width:252px;border-radius:6px;padding:16px;margin-inline-end:8px;margin-bottom:8px;justify-content:flex-start;flex-shrink:0;color:var(--color-bot-text);background:var(--color-bot-message-background);overflow:hidden}.wrapper .card .card-image{display:block;width:calc(100% + 32px);margin:-16px -16px 10px;min-height:88px;background-color:var(--color-attachment-placeholder)}.wrapper .card .card-title{font-size:16px;line-height:20px;margin:0 0 4px;font-weight:700}.wrapper .card .card-description{margin-bottom:16px;color:var(--color-text-light)}.wrapper .card:last-child{margin-bottom:0}.wrapper .card-message-content{width:100%;position:relative}.wrapper .card-message-content .card-message-cards{width:100%;align-items:stretch;display:flex;scroll-behavior:smooth;overflow-x:visible;flex-direction:column}.wrapper .message-bubble-tabular-message{width:calc(1.11 * 100%);max-width:unset;border-radius:0 8px 8px 8px;padding:0;overflow:hidden;background-color:var(--color-table-background);color:var(--color-table-text)}.wrapper .message-bubble-tabular-message~.message-footer{margin-top:8px}.wrapper .form-message-field,.wrapper .table-message-heading,.wrapper .table-message-item{overflow:hidden;overflow-wrap:break-word;word-break:break-word}.wrapper .table-message-wrapper{overflow:auto;background-color:#fff}.wrapper .table-message-wrapper .table-message{min-width:100%;max-width:200%;border-collapse:collapse}.wrapper .table-message-wrapper .table-message .table-message-headings{align-items:center;background-color:var(--color-table-header-background);display:flex}.wrapper .table-message-wrapper .table-message .table-message-headings .table-message-heading{color:rgba(22,21,19,.65);font-size:12px;font-weight:600;line-height:16px;padding:16px;min-width:120px}.wrapper .table-message-wrapper .table-message .table-message-row{border-top:1px solid var(--color-table-separator);display:flex;align-items:center}.wrapper .table-message-wrapper .table-message .table-message-row .table-message-item{color:var(--color-table-text);font-size:16px;line-height:20px;min-width:120px;padding:10px 16px}.wrapper .form-message-header{align-items:center;background-color:var(--color-table-header-background);color:var(--color-table-text);display:flex;font-weight:700;line-height:20px;padding:16px;text-align:start}.wrapper .form-message-item{border-bottom:1px solid var(--color-table-separator);display:flex;flex-flow:row wrap;justify-content:space-between;padding:16px 0;margin:0 16px}.wrapper .form-message-item:last-child{border-bottom:none}.wrapper .form-message-item .form-message-key{align-items:center;color:rgba(22,21,19,.65);display:flex;font-size:12px;line-height:16px}.wrapper .form-message-item .form-message-field{margin-bottom:16px}.wrapper .form-message-item .form-message-field.form-message-field-col-1{flex-basis:100%;max-width:100%}.wrapper .form-message-item .form-message-field.form-message-field-col-2{flex-basis:calc(50% - 12px);max-width:calc(50% - 12px)}.wrapper .tableform-message .table-message-row{cursor:pointer}.wrapper .tableform-message .table-message-row:hover{background-color:var(--color-row-item-background-hover)}.wrapper .tableform-message .table-message-row button:hover,.wrapper .tableform-message .table-message-row button:active,.wrapper .tableform-message .table-message-row button:focus{background-color:unset}.wrapper .tableform-message .table-message-headings .table-message-heading:last-child,.wrapper .tableform-message .table-message-row .table-message-item:last-child{min-width:unset;padding:0}.wrapper .tableform-message .table-message-headings .table-message-heading:last-child button,.wrapper .tableform-message .table-message-row .table-message-item:last-child button{margin:0 2px;transition:transform .25s ease-in-out}.wrapper .tableform-message .table-message-headings .table-message-heading:last-child button.rotate-180,.wrapper .tableform-message .table-message-row .table-message-item:last-child button.rotate-180{transform:rotate3d(0, 0, 1, 180deg)}.wrapper .tableform-message .form-message-item{background-color:#fbf9f8;margin:0;padding:16px;transition:all .25s ease-in-out;border-bottom:none}.wrapper .tableform-message .form-message-item.none{display:none}.wrapper .tableform-message .form-message-item:last-child{border-top:1px solid var(--color-table-bottom)}.wrapper .results-page-status{align-items:center;background-color:#fff;color:#161513;display:flex;flex-direction:row;font-size:13.75px;justify-content:flex-end;line-height:16px;padding:12px 16px;border-top:1px solid var(--color-table-separator)}.wrapper .footer{max-width:100%;padding:0;font-size:16px;background-color:var(--color-footer-background);z-index:3;box-shadow:0px -1px 4px 0px #0000001a}.wrapper .footer .footer-mode-keyboard{min-height:56px;padding:6px 8px;border-top:1px solid rgba(22,21,19,.1)}.wrapper .footer .footer-mode-voice{height:60px;padding:14px 0;background:var(--color-visualizer-container-background);justify-content:center}.wrapper .footer .footer-mode-voice .footer-visualizer-wrapper{max-width:296px;height:32px}.wrapper .footer .audio-text-wrapper{width:100%}.wrapper .footer .audio-text-wrapper .audio-text{flex-grow:1;height:34px;margin:0px 5px;border:none;outline:none;font-size:1em;background-color:transparent;color:var(--color-recognition-view-text)}.wrapper .footer.mode-keyboard .button-switch-kbd{display:none}.wrapper .footer.mode-keyboard .footer-mode-voice{display:none}.wrapper .footer.mode-voice .button-switch-voice{display:none}.wrapper .user-input{width:100%;min-height:44px;padding:10px;padding-inline-end:126px;margin:0;background-color:var(--color-input-background);color:var(--color-input-text);border:1px solid var(--color-input-border);font-size:1em;font-family:inherit;line-height:20px;outline:none;resize:none;border:none;border-radius:6px}.wrapper .footer-actions{position:absolute;right:12px}.wrapper .footer-button.button-send{background-color:var(--color-footer-button-fill);border-radius:50%}.wrapper .footer-button.button-send svg>path{fill:var(--color-input-background)}.wrapper .footer-button.button-send:not(:disabled):hover{background-color:var(--color-footer-button-fill-hover)}.wrapper .footer-button.button-send:not(:disabled):hover svg>path{fill:var(--color-input-background)}.wrapper .footer-button svg>path{fill:var(--color-footer-button-fill)}.wrapper .footer-button:not(:disabled):hover,.wrapper .footer-button:not(:disabled):focus{background-color:var(--color-footer-button-background-hover)}.wrapper .footer-button:not(:disabled):hover svg>path,.wrapper .footer-button:not(:disabled):focus svg>path{fill:var(--color-footer-button-fill-hover)}.wrapper .autocomplete-items{position:absolute;bottom:56px;width:100%;max-height:calc(100% - 56px);overflow-y:auto;background-color:var(--color-input-background);box-shadow:0px -1px 4px 0px #0000001a;padding:8px 0}.wrapper .autocomplete-items>div{min-height:40px;padding:8px 16px;cursor:pointer}.wrapper .autocomplete-items>div:hover,.wrapper .autocomplete-items>div.autocomplete-active{background-color:var(--color-card-nav-button-hover)}.wrapper .autocomplete-items>div strong{font-weight:700}.wrapper .dialog-wrapper{position:absolute;top:0;left:0;right:0;width:100%;height:100%}.wrapper .dialog-wrapper .prompt-banner-background{position:fixed;background:rgba(0,0,0,.2);height:100%;width:100%;z-index:5}.wrapper .dialog-wrapper .prompt-banner{align-items:center;box-shadow:rgba(0,0,0,.16) 0px 4px 8px 0px;border-radius:6px;display:flex;flex-direction:row;position:absolute;max-width:450px;min-height:48px;max-height:60%;top:30%;left:0;right:0;padding:8px 16px;margin:8px auto;width:calc(100% - 16px);z-index:5;animation:banner-in .2s cubic-bezier(0.22, 0.45, 0.42, 0.92) both;background-color:var(--color-popup-background);flex-direction:column;align-items:flex-start;overflow-y:auto}.wrapper .dialog-wrapper .prompt-banner.prompt-banner-out{animation:banner-out .2s cubic-bezier(0.5, 0.07, 0.68, 0.48) both}.wrapper .dialog-wrapper .prompt-banner .prompt-banner-main-content{margin:16px 0;align-items:flex-start}.wrapper .dialog-wrapper .prompt-banner .prompt-banner-main-content .prompt-banner-icon{margin:4px 16px 0 0}.wrapper .dialog-wrapper .prompt-banner .prompt-banner-main-content .prompt-banner-text{margin:0 28px 0 0;font-size:18px;font-weight:bold;color:var(--color-popup-text)}.wrapper .dialog-wrapper .prompt-banner .prompt-banner-main-content .prompt-banner-description{color:var(--color-popup-text);opacity:.6;font-size:13px;margin:8px 28px 0 0}.wrapper .dialog-wrapper .prompt-banner .prompt-banner-close-button{position:absolute;border:none;right:16px}.wrapper .dialog-wrapper .prompt-banner .action-wrapper{width:100%;margin:16px 0 6px}.wrapper .dialog-wrapper .prompt-banner .action-wrapper .popup-action{background-color:var(--color-popup-button-background);border-color:var(--color-popup-button-text);color:var(--color-popup-button-text);border-style:solid;margin:0;height:34px;justify-content:center;width:49%}.wrapper .dialog-wrapper .prompt-banner .action-wrapper .popup-action:hover{background-color:var(--color-footer-button-background-hover)}.wrapper .dialog-wrapper .prompt-banner .action-wrapper .popup-action:last-child{margin:0}.wrapper .dialog-wrapper .prompt-banner .action-wrapper .popup-action.filled{background-color:var(--color-popup-button-text);color:var(--color-popup-button-background)}.wrapper .dialog-wrapper .prompt-banner .action-wrapper .popup-action.filled:hover{opacity:.9}.wrapper .dialog-wrapper.end-conversation-prompt .prompt-banner-close-button{display:none}.wrapper.embedded .open{width:100%;height:100%}.wrapper.embedded .open .widget{border-radius:0;width:100%;height:100%;position:inherit;box-shadow:none;max-height:unset}@media(min-width: 1024px){.wrapper.embedded .conversation .conversation-pane .message-bubble{padding:16px 24px;font-size:16px}.wrapper.embedded .conversation .conversation-pane .message-bubble .attachment .attachment-placeholder{margin:-16px -24px 0;max-width:calc(100% + 48px)}.wrapper.embedded .conversation .conversation-pane .message-bubble .attachment .attachment-footer{margin:0 -24px -16px}.wrapper.embedded .conversation .conversation-pane.bot-icon .message-block .messages-wrapper,.wrapper.embedded .conversation .conversation-pane.user-icon .message-block .messages-wrapper{max-width:780px}.wrapper.embedded .conversation .conversation-pane.bot-icon .message-block .messages-wrapper .message-header,.wrapper.embedded .conversation .conversation-pane.bot-icon .message-block .messages-wrapper .message-footer,.wrapper.embedded .conversation .conversation-pane.user-icon .message-block .messages-wrapper .message-header,.wrapper.embedded .conversation .conversation-pane.user-icon .message-block .messages-wrapper .message-footer{max-width:780px}.wrapper.embedded .conversation .conversation-pane.bot-icon.bot-icon .message-block .messages-wrapper,.wrapper.embedded .conversation .conversation-pane.user-icon.bot-icon .message-block .messages-wrapper{max-width:780px}.wrapper.embedded .conversation .conversation-pane.bot-icon.bot-icon .message-block .messages-wrapper .message.card-message-horizontal .message-header,.wrapper.embedded .conversation .conversation-pane.bot-icon.bot-icon .message-block .messages-wrapper .message.card-message-horizontal .message-footer,.wrapper.embedded .conversation .conversation-pane.user-icon.bot-icon .message-block .messages-wrapper .message.card-message-horizontal .message-header,.wrapper.embedded .conversation .conversation-pane.user-icon.bot-icon .message-block .messages-wrapper .message.card-message-horizontal .message-footer{max-width:780px}.wrapper.embedded button:not(.icon){height:44px}}@media(min-width: 900px)and (max-width: 1023px){.wrapper.embedded .conversation .conversation-pane .message-bubble{padding:8px 16px;font-size:16px}.wrapper.embedded .conversation .conversation-pane .message-bubble .attachment .attachment-placeholder{margin:-8px -16px 0}.wrapper.embedded .conversation .conversation-pane .message-bubble .attachment .attachment-footer{margin:0 -16px -8px}.wrapper.embedded .conversation .conversation-pane.bot-icon .message-block .messages-wrapper,.wrapper.embedded .conversation .conversation-pane.user-icon .message-block .messages-wrapper{max-width:680px}.wrapper.embedded .conversation .conversation-pane.bot-icon .message-block .messages-wrapper .message.card-message-horizontal .message-header,.wrapper.embedded .conversation .conversation-pane.bot-icon .message-block .messages-wrapper .message.card-message-horizontal .message-footer,.wrapper.embedded .conversation .conversation-pane.user-icon .message-block .messages-wrapper .message.card-message-horizontal .message-header,.wrapper.embedded .conversation .conversation-pane.user-icon .message-block .messages-wrapper .message.card-message-horizontal .message-footer{max-width:680px}.wrapper.embedded .conversation .conversation-pane.bot-icon.bot-icon .message-block .messages-wrapper,.wrapper.embedded .conversation .conversation-pane.user-icon.bot-icon .message-block .messages-wrapper{max-width:680px}.wrapper.embedded .conversation .conversation-pane.bot-icon.bot-icon .message-block .messages-wrapper .message.card-message-horizontal .message-bubble,.wrapper.embedded .conversation .conversation-pane.user-icon.bot-icon .message-block .messages-wrapper .message.card-message-horizontal .message-bubble{padding:16px 24px}.wrapper.embedded .conversation .conversation-pane.bot-icon.bot-icon .message-block .messages-wrapper .message.card-message-horizontal .message-header,.wrapper.embedded .conversation .conversation-pane.bot-icon.bot-icon .message-block .messages-wrapper .message.card-message-horizontal .message-footer,.wrapper.embedded .conversation .conversation-pane.user-icon.bot-icon .message-block .messages-wrapper .message.card-message-horizontal .message-header,.wrapper.embedded .conversation .conversation-pane.user-icon.bot-icon .message-block .messages-wrapper .message.card-message-horizontal .message-footer{max-width:680px}.wrapper.embedded button:not(.icon){height:44px}}.wrapper:not(.embedded){height:48px;width:48px}.wrapper .full-screen-modal{position:fixed;top:0;left:0;width:100%;height:100vh;z-index:1000000;background-color:rgba(0,0,0,.8)}.wrapper .modal-header{background:linear-gradient(180deg, rgba(0, 0, 0, 0.5), transparent);color:#fff;display:flex;justify-content:space-between;position:relative;padding:10px 20px;z-index:1000001}.wrapper .modal-header .close-btn{border:none;background:transparent;cursor:pointer}.wrapper .full-screen-image{position:absolute;max-width:100vw;max-height:100vh;margin:auto;top:0;bottom:0;left:0;right:0}.wrapper .typing-cue-wrapper{width:32px;margin:auto}.wrapper .typing-cue-wrapper .typing-cue{position:relative;left:0;right:0;margin:auto;width:8px;height:8px;border-radius:50%;background-color:var(--color-typing-indicator);animation:typing-cue 500ms infinite linear alternate;animation-delay:250ms}.wrapper .typing-cue-wrapper .typing-cue::before,.wrapper .typing-cue-wrapper .typing-cue::after{content:"";display:inline-block;position:absolute;width:8px;height:8px;border-radius:50%;background-color:var(--color-typing-indicator);animation:typing-cue 500ms infinite linear alternate}.wrapper .typing-cue-wrapper .typing-cue::before{left:-12px;animation-delay:0s}.wrapper .typing-cue-wrapper .typing-cue::after{left:12px;animation-delay:500ms}.wrapper .hidden{border:0;clip:rect(0 0 0 0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px}.wrapper .rating-root{display:flex}.wrapper [dir=rtl] .rating-root{flex-direction:row-reverse}.wrapper .rating-wrapper{display:flex;margin-top:8px}.wrapper [dir=rtl] .rating-wrapper{flex-direction:row-reverse}.wrapper .rating-hidden{border:0;clip:rect(0 0 0 0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px}.wrapper .star-label{background-color:transparent;border:0;cursor:pointer;padding:0}.wrapper .star-label>svg>path{fill:var(--color-rating-star)}.wrapper .star-input.active+label>svg>path{fill:var(--color-rating-star-fill)}.wrapper .star-input:disabled+.star-label{cursor:not-allowed;filter:brightness(0.8)}.wrapper .rating-star-icon{height:32px;width:32px}.wrapper.expanded .widget{animation:scale-in-br .25s cubic-bezier(0.25, 0.46, 0.45, 0.94) .2s both}.wrapper.expanded:not(.drag) .button{animation:scale-out-center .25s cubic-bezier(0.55, 0.085, 0.68, 0.53) forwards}.wrapper.collapsed .widget{animation:scale-out-br .25s cubic-bezier(0.55, 0.085, 0.68, 0.53) forwards}.wrapper.collapsed .notification-badge{background-color:var(--color-notification-badge-background);color:var(--color-notification-badge-text);right:-5px;top:-5px;align-items:center;border-radius:24px;display:flex;font-size:14px;height:24px;justify-content:center;position:absolute;text-align:center;width:32px}.wrapper.collapsed:not(.drag) .button{animation:scale-in-center .25s cubic-bezier(0.25, 0.46, 0.45, 0.94) .2s both}.wrapper.pos-left .widget{right:unset}.wrapper.pos-left.expanded .widget{animation:scale-in-bl .25s cubic-bezier(0.25, 0.46, 0.45, 0.94) .2s both}.wrapper.pos-left.collapsed .widget{animation:scale-out-bl .25s cubic-bezier(0.55, 0.085, 0.68, 0.53) forwards}.wrapper .ellipsis{width:100%;display:inline-block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.wrapper .popup{position:absolute;background-color:var(--color-popup-background);color:var(--color-popup-text);min-width:140px;max-height:calc(100% - 128px);display:none;padding:4px 0;border-radius:6px;box-shadow:rgba(0,0,0,.16) 0px 4px 8px 0px;overflow-y:auto;z-index:5}.wrapper .popup li{display:flex;align-items:center;height:48px;margin:4px 0;cursor:pointer;overflow:hidden}.wrapper .popup li svg>path{fill:var(--color-popup-text)}.wrapper .popup li#action-menu-option-lang{border-top:1px solid var(--color-popup-horizontal-rule)}.wrapper .popup li.disable{pointer-events:none;cursor:not-allowed;opacity:.5}.wrapper .popup li:hover,.wrapper .popup li:focus,.wrapper .popup li.active{background-color:var(--color-popup-item-background-hover)}.wrapper .popup li .icon{margin-inline-start:16px;height:24px;width:24px}.wrapper .popup li .text{padding:0 16px 0 16px}.wrapper .popup.expand{display:block;-webkit-animation:scale-in-br .25s cubic-bezier(0.25, 0.46, 0.45, 0.94) .2s both;animation:scale-in-br .25s cubic-bezier(0.25, 0.46, 0.45, 0.94) .2s both}.wrapper .popup.action-menu,.wrapper .popup.language-selection-menu{top:50px;bottom:unset}.wrapper .popup.action-menu.expand,.wrapper .popup.language-selection-menu.expand{display:block;-webkit-animation:scale-in-tr .25s cubic-bezier(0.25, 0.46, 0.45, 0.94) .2s both;animation:scale-in-tr .25s cubic-bezier(0.25, 0.46, 0.45, 0.94) .2s both}.wrapper .popup.language-selection-menu{max-height:calc(100% - 280px)}.wrapper .popup.share-popup-list{position:fixed;bottom:50px;left:unset}.wrapper .spinner{height:48px;width:48px}.wrapper .spinner svg{animation-duration:750ms;-webkit-animation:spin 1s linear infinite;animation:spin 1s linear infinite}.wrapper .spinner svg circle{fill:transparent;stroke:var(--color-user-text);stroke-width:2px;stroke-dasharray:128px;stroke-dashoffset:82px}.wrapper .webview-container{position:absolute;width:100%;height:80%;bottom:0;box-shadow:0px -4px 32px rgba(0,0,0,.1);z-index:10}.wrapper .webview-container .webview-header svg{fill:var(--color-actions-text)}.wrapper .webview-container .spinner{position:absolute;margin:auto;left:0;right:0;top:40%}.wrapper .webview-container iframe{width:100%;height:100%;background:var(--color-conversation-background);border:none}.wrapper .webview-container .webview-error{position:absolute;bottom:0;background:var(--color-popup-background);width:calc(100% - 32px);margin:10px 16px;padding:6px 16px;border-radius:6px;display:flex;align-items:center;box-shadow:0px -4px 32px rgba(0,0,0,.1)}.wrapper .webview-container .webview-error .webview-error-button-close{border:none}.wrapper .webview-container.webview-container-close{animation:oda-chat-webview-slide-out-bottom .4s cubic-bezier(0.55, 0.085, 0.68, 0.53) both}.wrapper .webview-container.webview-container-open{animation:oda-chat-webview-slide-in-bottom .4s cubic-bezier(0.25, 0.46, 0.45, 0.94) both}.image-preview-wrapper{background:rgba(0,0,0,.8);height:100%;position:fixed;top:0;left:0;width:100%;z-index:10000}.image-preview-wrapper .image-preview-header{align-items:center;background:linear-gradient(180deg, rgba(0, 0, 0, 0.5), transparent);color:#fff;display:flex;justify-content:space-between;position:relative;padding:10px 20px;z-index:1000001}.image-preview-wrapper .image-preview-header .image-preview-close{background:transparent;border:none;cursor:pointer;height:36px;width:36px}.image-preview-wrapper .image-preview-header .image-preview-close .image-preview-close-icon{fill:#fff;height:100%;width:100%}.image-preview-wrapper .image-preview{bottom:0;left:0;margin:auto;max-height:100vh;max-width:100vw;position:absolute;right:0;top:0}.arrow-icon{margin-inline-end:2px;width:32px;height:32px;display:flex;align-items:center;flex-shrink:0}@media screen and (min-width: 426px){.wrapper .widget{width:375px;height:620px}}@media(prefers-reduced-motion){.open{animation:none}.close{animation:none}}[dir=rtl] *:not(.card-message-horizontal.carousel .message-wrapper *){direction:rtl}[dir=rtl] .card-message-horizontal.carousel .message-wrapper .card *{direction:rtl}[dir=rtl] .wrapper{left:20px;right:unset;text-align:right}[dir=rtl] .wrapper .widget{left:0;right:unset}[dir=rtl] .wrapper .widget.open{animation:scale-in-bl .25s cubic-bezier(0.25, 0.46, 0.45, 0.94) .2s both}[dir=rtl] .wrapper .widget.close{animation:scale-out-bl .25s cubic-bezier(0.55, 0.085, 0.68, 0.53) forwards}[dir=rtl] .wrapper .message-bubble{border-radius:10px 2px 2px 10px}[dir=rtl] .wrapper .message-block .message:last-child .message-bubble:last-child{border-radius:10px 2px 10px 10px}[dir=rtl] .wrapper .message-block.right .messages-wrapper .message .message-bubble{border-radius:2px 10px 10px 2px}[dir=rtl] .wrapper .message-block.right .messages-wrapper .message:last-child .message-bubble:last-child{border-radius:2px 10px 10px 10px}[dir=rtl] .wrapper .footer-actions{left:12px;right:unset}[dir=rtl] .wrapper .button{left:0;right:unset}[dir=rtl] .wrapper .popup.expand{-webkit-animation:scale-in-bl .25s cubic-bezier(0.25, 0.46, 0.45, 0.94) .2s both;animation:scale-in-bl .25s cubic-bezier(0.25, 0.46, 0.45, 0.94) .2s both}[dir=rtl] .wrapper .popup.action-menu.expand,[dir=rtl] .wrapper .popup.language-selection-menu.expand{-webkit-animation:scale-in-tl .25s cubic-bezier(0.25, 0.46, 0.45, 0.94) .2s both;animation:scale-in-tl .25s cubic-bezier(0.25, 0.46, 0.45, 0.94) .2s both}';
          },
          5081: function (e, t, n) {
            var o, i, r;
            n.r(t),
              n.d(t, {
                AuthError: function () {
                  return r;
                },
                AuthTokenService: function () {
                  return c;
                },
                Deferred: function () {
                  return f;
                },
                JWT: function () {
                  return a;
                },
                KeyCode: function () {
                  return o;
                },
                ShareCategory: function () {
                  return i;
                },
                buildURL: function () {
                  return Z;
                },
                drawVisualizer: function () {
                  return $;
                },
                formatDate: function () {
                  return q;
                },
                getLongPollURL: function () {
                  return X;
                },
                getWebSocketURL: function () {
                  return J;
                },
                isAndroid: function () {
                  return G;
                },
                isApple: function () {
                  return Y;
                },
                isFunction: function () {
                  return W;
                },
                isMobile: function () {
                  return K;
                },
                isSameDay: function () {
                  return Q;
                },
                startTimer: function () {
                  return H;
                },
                supportedLang: function () {
                  return j;
                },
              }),
              (function (e) {
                (e.Return = "Enter"),
                  (e.Esc = "Escape"),
                  (e.Space = "Space"),
                  (e.Left = "ArrowLeft"),
                  (e.Up = "ArrowUp"),
                  (e.Right = "ArrowRight"),
                  (e.Down = "ArrowDown"),
                  (e.Tab = "Tab"),
                  (e.PageDown = "PageDown"),
                  (e.PageUp = "PageUp"),
                  (e.Home = "Home"),
                  (e.End = "End"),
                  (e.Backspace = "Backspace");
              })(o || (o = {})),
              (function (e) {
                (e.Audio = "audio"),
                  (e.File = "file"),
                  (e.Location = "location"),
                  (e.Visual = "visual");
              })(i || (i = {})),
              (function (e) {
                (e.AuthExpiredToken = "AuthExpiredToken"),
                  (e.AuthNoToken = "AuthNoToken"),
                  (e.AuthNoChannelId = "AuthNochannelId"),
                  (e.AuthNoUserId = "AuthNouserId"),
                  (e.AuthNoExp = "AuthNoexp"),
                  (e.AuthNoIat = "AuthNoiat"),
                  (e.AuthInvalidChannelId = "AuthInvalidchannelId"),
                  (e.AuthInvalidUserId = "AuthInvaliduserId"),
                  (e.AuthInvalidExp = "AuthInvalidexp"),
                  (e.AuthInvalidIat = "AuthInvalidiat"),
                  (e.AuthEmptyChannelIdClaim = "AuthInvalidchannelId"),
                  (e.AuthEmptyUserIdClaim = "AuthInvaliduserId"),
                  (e.AuthNegativeExp = "AuthNegativeexp"),
                  (e.AuthNegativeIat = "AuthNegativeiat"),
                  (e.AuthExpLessThanIat = "AuthExpLessThanIat");
              })(r || (r = {}));
            class a {
              constructor(e) {
                this.token = e;
                const t = this.token.split(".");
                this.payload = JSON.parse(atob(t[1]));
              }
              getClaim(e) {
                return this.payload[e];
              }
            }
            const s = Promise;
            class c {
              static getInstance() {
                return this.service || (this.service = new c()), this.service;
              }
              get() {
                return this.jws && u(this.jws)
                  ? s.resolve(this.jws)
                  : new s((e, t) => {
                      s.resolve(this.fetch()).then((n) => {
                        this.jws = new a(n);
                        try {
                          if (
                            ((function (e) {
                              e || g(r.AuthNoToken);
                              const t = "iat",
                                n = e.getClaim(t);
                              d(t, p, n);
                              const o = e.getClaim(h);
                              d(h, p, o), o <= n && g(r.AuthExpLessThanIat);
                              const i = "channelId",
                                a = e.getClaim(i);
                              d(i, l, a);
                              const s = "userId",
                                c = e.getClaim(s);
                              d(s, l, c);
                            })(this.jws),
                            u(this.jws))
                          )
                            return void e(this.jws);
                          g(r.AuthExpiredToken);
                        } catch (e) {
                          t(e);
                        }
                      });
                    });
              }
              reset() {
                this.jws = void 0;
              }
              setFetch(e) {
                if (!W(e))
                  throw new Error(
                    "'generateAuthToken' is not a function. Create a function that returns a Promise that resolves to a new JWT when called."
                  );
                (this.fetch = e), this.reset();
              }
            }
            const l = "string",
              p = "number",
              h = "exp";
            function u(e) {
              const t = Math.floor((Date.now() + 2e4) / 1e3);
              return e.getClaim(h) > t;
            }
            function d(e, t, n) {
              null == n && g(`AuthNo${e}`),
                typeof n !== t && g(`AuthInvalid${e}`),
                "number" == typeof n
                  ? n <= 0 && g(`AuthNegative${e}`)
                  : n.length || g(`AuthEmpty${e}`);
            }
            function g(e) {
              throw Error(e);
            }
            class f {
              constructor() {
                (this.promise = new Promise((e, t) => {
                  (this.resolve = e), (this.reject = t);
                })),
                  Object.freeze(this);
              }
            }
            var m =
                /d{1,4}|M{1,4}|YY(?:YY)?|S{1,3}|Do|ZZ|Z|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g,
              v = /\[([^]*?)\]/gm;
            function b(e, t) {
              for (var n = [], o = 0, i = e.length; o < i; o++)
                n.push(e[o].substr(0, t));
              return n;
            }
            var w = function (e) {
              return function (t, n) {
                var o = n[e]
                  .map(function (e) {
                    return e.toLowerCase();
                  })
                  .indexOf(t.toLowerCase());
                return o > -1 ? o : null;
              };
            };
            function y(e) {
              for (var t = [], n = 1; n < arguments.length; n++)
                t[n - 1] = arguments[n];
              for (var o = 0, i = t; o < i.length; o++) {
                var r = i[o];
                for (var a in r) e[a] = r[a];
              }
              return e;
            }
            var C = [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
              ],
              x = [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ],
              _ = b(x, 3),
              S = {
                dayNamesShort: b(C, 3),
                dayNames: C,
                monthNamesShort: _,
                monthNames: x,
                amPm: ["am", "pm"],
                DoFn: function (e) {
                  return (
                    e +
                    ["th", "st", "nd", "rd"][
                      e % 10 > 3 ? 0 : ((e - (e % 10) != 10 ? 1 : 0) * e) % 10
                    ]
                  );
                },
              },
              T = y({}, S),
              A = function (e, t) {
                for (void 0 === t && (t = 2), e = String(e); e.length < t; )
                  e = "0" + e;
                return e;
              },
              I = {
                D: function (e) {
                  return String(e.getDate());
                },
                DD: function (e) {
                  return A(e.getDate());
                },
                Do: function (e, t) {
                  return t.DoFn(e.getDate());
                },
                d: function (e) {
                  return String(e.getDay());
                },
                dd: function (e) {
                  return A(e.getDay());
                },
                ddd: function (e, t) {
                  return t.dayNamesShort[e.getDay()];
                },
                dddd: function (e, t) {
                  return t.dayNames[e.getDay()];
                },
                M: function (e) {
                  return String(e.getMonth() + 1);
                },
                MM: function (e) {
                  return A(e.getMonth() + 1);
                },
                MMM: function (e, t) {
                  return t.monthNamesShort[e.getMonth()];
                },
                MMMM: function (e, t) {
                  return t.monthNames[e.getMonth()];
                },
                YY: function (e) {
                  return A(String(e.getFullYear()), 4).substr(2);
                },
                YYYY: function (e) {
                  return A(e.getFullYear(), 4);
                },
                h: function (e) {
                  return String(e.getHours() % 12 || 12);
                },
                hh: function (e) {
                  return A(e.getHours() % 12 || 12);
                },
                H: function (e) {
                  return String(e.getHours());
                },
                HH: function (e) {
                  return A(e.getHours());
                },
                m: function (e) {
                  return String(e.getMinutes());
                },
                mm: function (e) {
                  return A(e.getMinutes());
                },
                s: function (e) {
                  return String(e.getSeconds());
                },
                ss: function (e) {
                  return A(e.getSeconds());
                },
                S: function (e) {
                  return String(Math.round(e.getMilliseconds() / 100));
                },
                SS: function (e) {
                  return A(Math.round(e.getMilliseconds() / 10), 2);
                },
                SSS: function (e) {
                  return A(e.getMilliseconds(), 3);
                },
                a: function (e, t) {
                  return e.getHours() < 12 ? t.amPm[0] : t.amPm[1];
                },
                A: function (e, t) {
                  return e.getHours() < 12
                    ? t.amPm[0].toUpperCase()
                    : t.amPm[1].toUpperCase();
                },
                ZZ: function (e) {
                  var t = e.getTimezoneOffset();
                  return (
                    (t > 0 ? "-" : "+") +
                    A(
                      100 * Math.floor(Math.abs(t) / 60) + (Math.abs(t) % 60),
                      4
                    )
                  );
                },
                Z: function (e) {
                  var t = e.getTimezoneOffset();
                  return (
                    (t > 0 ? "-" : "+") +
                    A(Math.floor(Math.abs(t) / 60), 2) +
                    ":" +
                    A(Math.abs(t) % 60, 2)
                  );
                },
              },
              E =
                (w("monthNamesShort"),
                w("monthNames"),
                {
                  default: "ddd MMM DD YYYY HH:mm:ss",
                  shortDate: "M/D/YY",
                  mediumDate: "MMM D, YYYY",
                  longDate: "MMMM D, YYYY",
                  fullDate: "dddd, MMMM D, YYYY",
                  isoDate: "YYYY-MM-DD",
                  isoDateTime: "YYYY-MM-DDTHH:mm:ssZ",
                  shortTime: "HH:mm",
                  mediumTime: "HH:mm:ss",
                  longTime: "HH:mm:ss.SSS",
                }),
              k = function (e, t, n) {
                if (
                  (void 0 === t && (t = E.default),
                  void 0 === n && (n = {}),
                  "number" == typeof e && (e = new Date(e)),
                  "[object Date]" !== Object.prototype.toString.call(e) ||
                    isNaN(e.getTime()))
                )
                  throw new Error("Invalid Date pass to format");
                var o = [];
                t = (t = E[t] || t).replace(v, function (e, t) {
                  return o.push(t), "@@@";
                });
                var i = y(y({}, T), n);
                return (t = t.replace(m, function (t) {
                  return I[t](e, i);
                })).replace(/@@@/g, function () {
                  return o.shift();
                });
              };
            const M = window.setInterval,
              L = window.setTimeout,
              O = 36e5,
              P = 864e5;
            let D;
            const R = () => {
                clearTimeout(D), clearInterval(D);
              },
              B = (e, t, n, o, i, r) => {
                var a;
                let s = 1;
                R(),
                  e(
                    (null === (a = t[i]) || void 0 === a
                      ? void 0
                      : a.replace("{0}", `${s}`)) || ""
                  ),
                  (D = M(() => {
                    var o;
                    s++,
                      n && r && s >= n
                        ? r(e, t)
                        : e(
                            (null === (o = t[i]) || void 0 === o
                              ? void 0
                              : o.replace("{0}", `${s}`)) || ""
                          );
                  }, o));
              },
              N = (e, t) => {
                B(e, t, 60, 6e4, "relTimeMin", V);
              },
              V = (e, t) => {
                B(e, t, 24, O, "relTimeHr", z);
              },
              z = (e, t) => {
                B(e, t, 30, P, "relTimeDay", F);
              },
              F = (e, t) => {
                B(e, t, 12, 2592e6, "relTimeMon", U);
              },
              U = (e, t) => {
                B(e, t, 0, 31536e6, "relTimeYr");
              },
              H = (e, t) => {
                R(),
                  e(t.relTimeNow || ""),
                  (D = L(() => {
                    ((e, t) => {
                      R(),
                        e(t.relTimeMoment || ""),
                        (D = L(() => {
                          N(e, t);
                        }, 5e4));
                    })(e, t);
                  }, 1e4));
              },
              j = {
                ar: "العربية",
                de: "Deutsch",
                en: "English",
                es: "Español",
                fr: "Français",
                it: "Italiano",
                nl: "Nederlands",
                bt: "Português",
                hi: "हिंदी",
              },
              W = (e) => e instanceof Function,
              G = () => /Android/i.test(navigator.userAgent),
              Y = () => /iPhone|iPad/i.test(navigator.userAgent),
              K = () => G() || Y();
            function q(e, { pattern: t, locale: n }) {
              let o;
              o = "string" == typeof e ? new Date(e) : e;
              const i = `${o
                .toLocaleDateString(n, {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })
                .replace(/,/g, "")}, ${o.toLocaleTimeString(n, {
                hour: "numeric",
                minute: "numeric",
                hour12: !0,
              })}`;
              if ("string" == typeof t)
                try {
                  return k(o, t);
                } catch (e) {
                  return i;
                }
              return "object" == typeof t && null !== t
                ? o.toLocaleString(n, t)
                : i;
            }
            function $(e, t, n = "#000") {
              const o = t.height,
                i = t.width,
                r = Math.floor(o / 2);
              let a = (function (e, t) {
                const n = Math.ceil(t / 2),
                  o = e.length / n,
                  i = [],
                  r = [];
                for (let t = 0; t < e.length; t += o) {
                  const n =
                    e
                      .slice(t, t + o)
                      .map((e) => e * e)
                      .reduce((e, t) => e + t, 0) / o;
                  i.push(n), r.unshift(n);
                }
                return i.splice(0, 1), r.concat(i);
              })(e, 31);
              a = (function (e, t) {
                return e.map((e) => e * t);
              })(a, o / 255);
              const s = t.getContext("2d");
              if (s) {
                (s.fillStyle = n), s.clearRect(0, 0, i, o), s.save();
                let e = 0;
                a.forEach((t) => {
                  const n = Math.ceil(t / 2) + 1;
                  s.fillRect(e, r - n, 2, 2 * n), (e += 8);
                }),
                  s.save();
              }
            }
            function Z(e, t, n, o) {
              return (function (e, t) {
                const n = Object.keys(t).map((e) => `${e}=${t[e]}`);
                return n.length ? `${e}?${n.join("&")}` : e;
              })(`${e}${t}${o}`, n);
            }
            function J(e, t, n = !0, o = "websdk") {
              return Z(
                `ws${n ? "s" : ""}://`,
                e,
                t,
                `/chat/v1/chats/sockets/${o}`
              );
            }
            function X(e, t, n = !0) {
              return Z(
                `http${n ? "s" : ""}://`,
                e,
                t,
                "/chat/v1/chats/message"
              );
            }
            const Q = (e, t) => {
              const n = new Date(e),
                o = new Date(t);
              return (
                n.getDate() === o.getDate() &&
                n.getMonth() === o.getMonth() &&
                n.getFullYear() === o.getFullYear()
              );
            };
          },
          9297: function (e, t, n) {
            n.r(t),
              n.d(t, {
                default: function () {
                  return m;
                },
              });
            var o = function (e) {
                var t = this.constructor;
                return this.then(
                  function (n) {
                    return t.resolve(e()).then(function () {
                      return n;
                    });
                  },
                  function (n) {
                    return t.resolve(e()).then(function () {
                      return t.reject(n);
                    });
                  }
                );
              },
              i = function (e) {
                return new this(function (t, n) {
                  if (!e || void 0 === e.length)
                    return n(
                      new TypeError(
                        typeof e +
                          " " +
                          e +
                          " is not iterable(cannot read property Symbol(Symbol.iterator))"
                      )
                    );
                  var o = Array.prototype.slice.call(e);
                  if (0 === o.length) return t([]);
                  var i = o.length;
                  function r(e, n) {
                    if (n && ("object" == typeof n || "function" == typeof n)) {
                      var a = n.then;
                      if ("function" == typeof a)
                        return void a.call(
                          n,
                          function (t) {
                            r(e, t);
                          },
                          function (n) {
                            (o[e] = { status: "rejected", reason: n }),
                              0 == --i && t(o);
                          }
                        );
                    }
                    (o[e] = { status: "fulfilled", value: n }),
                      0 == --i && t(o);
                  }
                  for (var a = 0; a < o.length; a++) r(a, o[a]);
                });
              },
              r = setTimeout,
              a = "undefined" != typeof setImmediate ? setImmediate : null;
            function s(e) {
              return Boolean(e && void 0 !== e.length);
            }
            function c() {}
            function l(e) {
              if (!(this instanceof l))
                throw new TypeError("Promises must be constructed via new");
              if ("function" != typeof e) throw new TypeError("not a function");
              (this._state = 0),
                (this._handled = !1),
                (this._value = void 0),
                (this._deferreds = []),
                f(e, this);
            }
            function p(e, t) {
              for (; 3 === e._state; ) e = e._value;
              0 !== e._state
                ? ((e._handled = !0),
                  l._immediateFn(function () {
                    var n = 1 === e._state ? t.onFulfilled : t.onRejected;
                    if (null !== n) {
                      var o;
                      try {
                        o = n(e._value);
                      } catch (e) {
                        return void u(t.promise, e);
                      }
                      h(t.promise, o);
                    } else (1 === e._state ? h : u)(t.promise, e._value);
                  }))
                : e._deferreds.push(t);
            }
            function h(e, t) {
              try {
                if (t === e)
                  throw new TypeError(
                    "A promise cannot be resolved with itself."
                  );
                if (t && ("object" == typeof t || "function" == typeof t)) {
                  var n = t.then;
                  if (t instanceof l)
                    return (e._state = 3), (e._value = t), void d(e);
                  if ("function" == typeof n)
                    return void f(
                      ((o = n),
                      (i = t),
                      function () {
                        o.apply(i, arguments);
                      }),
                      e
                    );
                }
                (e._state = 1), (e._value = t), d(e);
              } catch (t) {
                u(e, t);
              }
              var o, i;
            }
            function u(e, t) {
              (e._state = 2), (e._value = t), d(e);
            }
            function d(e) {
              2 === e._state &&
                0 === e._deferreds.length &&
                l._immediateFn(function () {
                  e._handled || l._unhandledRejectionFn(e._value);
                });
              for (var t = 0, n = e._deferreds.length; t < n; t++)
                p(e, e._deferreds[t]);
              e._deferreds = null;
            }
            function g(e, t, n) {
              (this.onFulfilled = "function" == typeof e ? e : null),
                (this.onRejected = "function" == typeof t ? t : null),
                (this.promise = n);
            }
            function f(e, t) {
              var n = !1;
              try {
                e(
                  function (e) {
                    n || ((n = !0), h(t, e));
                  },
                  function (e) {
                    n || ((n = !0), u(t, e));
                  }
                );
              } catch (e) {
                if (n) return;
                (n = !0), u(t, e);
              }
            }
            (l.prototype.catch = function (e) {
              return this.then(null, e);
            }),
              (l.prototype.then = function (e, t) {
                var n = new this.constructor(c);
                return p(this, new g(e, t, n)), n;
              }),
              (l.prototype.finally = o),
              (l.all = function (e) {
                return new l(function (t, n) {
                  if (!s(e))
                    return n(new TypeError("Promise.all accepts an array"));
                  var o = Array.prototype.slice.call(e);
                  if (0 === o.length) return t([]);
                  var i = o.length;
                  function r(e, a) {
                    try {
                      if (
                        a &&
                        ("object" == typeof a || "function" == typeof a)
                      ) {
                        var s = a.then;
                        if ("function" == typeof s)
                          return void s.call(
                            a,
                            function (t) {
                              r(e, t);
                            },
                            n
                          );
                      }
                      (o[e] = a), 0 == --i && t(o);
                    } catch (e) {
                      n(e);
                    }
                  }
                  for (var a = 0; a < o.length; a++) r(a, o[a]);
                });
              }),
              (l.allSettled = i),
              (l.resolve = function (e) {
                return e && "object" == typeof e && e.constructor === l
                  ? e
                  : new l(function (t) {
                      t(e);
                    });
              }),
              (l.reject = function (e) {
                return new l(function (t, n) {
                  n(e);
                });
              }),
              (l.race = function (e) {
                return new l(function (t, n) {
                  if (!s(e))
                    return n(new TypeError("Promise.race accepts an array"));
                  for (var o = 0, i = e.length; o < i; o++)
                    l.resolve(e[o]).then(t, n);
                });
              }),
              (l._immediateFn =
                ("function" == typeof a &&
                  function (e) {
                    a(e);
                  }) ||
                function (e) {
                  r(e, 0);
                }),
              (l._unhandledRejectionFn = function (e) {
                "undefined" != typeof console &&
                  console &&
                  console.warn("Possible Unhandled Promise Rejection:", e);
              });
            var m = l;
          },
          7496: function (e, t) {
            var n;
            Object.defineProperty(t, "__esModule", { value: !0 }),
              (t.ChatEvent = void 0),
              (function (e) {
                (e.CHAT_LANG = "chatlanguagechange"),
                  (e.CLICK_AUDIO_RESPONSE_TOGGLE = "click:audiotoggle"),
                  (e.CLICK_ERASE = "click:erase"),
                  (e.CLICK_VOICE_TOGGLE = "click:voicetoggle"),
                  (e.DESTROY = "destroy"),
                  (e.CHAT_END = "chatend"),
                  (e.MESSAGE = "message"),
                  (e.MESSAGE_RECEIVED = "message:received"),
                  (e.MESSAGE_SENT = "message:sent"),
                  (e.NETWORK = "networkstatuschange"),
                  (e.READY = "ready"),
                  (e.TYPING = "typing"),
                  (e.UNREAD = "unreadCount"),
                  (e.WIDGET_CLOSED = "widget:closed"),
                  (e.WIDGET_OPENED = "widget:opened");
              })(n || (n = {})),
              (t.ChatEvent = n);
          },
          4534: function (e, t) {
            Object.defineProperty(t, "__esModule", { value: !0 }),
              (t.Constants =
                t.ATTACHMENT_MAX_HEIGHT =
                t.MESSAGE_BLOCK_THRESOLD =
                t.ATTACHMENT_MAX_SIZE =
                t.BYTE_MULTIPLIER =
                t.SDK_VERSION =
                  void 0);
            var n = (function () {
              function e() {}
              return (
                (e.GEOLOCATION_REQUEST_DENIED = 1),
                (e.CHAT_SCROLL_DELAY = 300),
                (e.WEBSOCKET_READY_STATE = [
                  "CONNECTING",
                  "OPEN",
                  "CLOSING",
                  "CLOSED",
                ]),
                (e.WEBSOCKET_CLOSE_EVENT = {
                  CODE: { ABNORMAL_CLOSURE: 1006 },
                }),
                (e.ATTACHMENT_HEADER = {
                  AUTHORIZATION: "Authorization",
                  FILE_AUTH_TYPE: "x-oda-meta-file-authType",
                  FILE_IS_PROTECTED: "x-oda-meta-file-isProtected",
                  FILE_SIZE: "x-oda-meta-file-size",
                }),
                (e.MAX_SUGGESTIONS_COUNT = 5),
                (e.MIN_SUGGESTIONS_COUNT = 1),
                (e.SUGGESTIONS_COUNT_THRESHOLD = 30),
                (e.TIME = { MIN_FIFTY: 3e6 }),
                e
              );
            })();
            (t.Constants = n),
              (t.SDK_VERSION = "22.04"),
              (t.BYTE_MULTIPLIER = 1024),
              (t.ATTACHMENT_MAX_SIZE =
                25 * t.BYTE_MULTIPLIER * t.BYTE_MULTIPLIER),
              (t.MESSAGE_BLOCK_THRESOLD = 1e4),
              (t.ATTACHMENT_MAX_HEIGHT = 211);
          },
          1489: function (e, t, n) {
            var o =
              (this && this.__spreadArray) ||
              function (e, t, n) {
                if (n || 2 === arguments.length)
                  for (var o, i = 0, r = t.length; i < r; i++)
                    (!o && i in t) ||
                      (o || (o = Array.prototype.slice.call(t, 0, i)),
                      (o[i] = t[i]));
                return e.concat(o || Array.prototype.slice.call(t));
              };
            Object.defineProperty(t, "__esModule", { value: !0 }),
              (t.on = t.isElemVisible = t.addChild = t.DOMUtil = void 0);
            var i = n(5081),
              r = n(1389),
              a = n(5949),
              s = "aria-expanded",
              c = "aria-activedescendant",
              l = "expand",
              p =
                /((?:href|src)\s*=\s*['"])?(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim,
              h =
                /((?:href|src)\s*=\s*['"])?([-+&@#\/%?=~_|!:,.;])?(\bwww\.[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim,
              u = (function () {
                function e(e) {
                  (this.openPopupList = []), (this.cssPrefix = e.name);
                }
                return (
                  (e.prototype.addCSSClass = function (e) {
                    for (var t = this, n = [], o = 1; o < arguments.length; o++)
                      n[o - 1] = arguments[o];
                    e.classList
                      ? n.forEach(function (n) {
                          return e.classList.add(
                            "".concat(t.cssPrefix, "-").concat(n)
                          );
                        })
                      : e.setAttribute(
                          "class",
                          n.reduce(function (e, n) {
                            return ""
                              .concat(e, " ")
                              .concat(t.cssPrefix, "-")
                              .concat(n);
                          }, "")
                        );
                  }),
                  (e.prototype.createAnchor = function (e, t, n, o, i) {
                    void 0 === n && (n = []), void 0 === o && (o = !1);
                    var r = this.createElement("a", n);
                    r.rel = "noreferrer noopener";
                    var a = !1;
                    return (
                      (r.href = e),
                      (r.innerText = t),
                      i &&
                        (i.onclick &&
                          ((r.onclick = i.onclick.bind(r)), (a = !0)),
                        i.target && ((r.target = i.target), (a = !0))),
                      a ||
                        (o
                          ? r.addEventListener("click", function (t) {
                              return (
                                window.open(
                                  e,
                                  "",
                                  "height=450px,width=800px,menubar,toolbar,personalbar,status,resizable,noopener,noreferrer"
                                ),
                                t.preventDefault(),
                                t.stopPropagation(),
                                !1
                              );
                            })
                          : (r.target = "_blank")),
                      r
                    );
                  }),
                  (e.prototype.createButton = function (e) {
                    void 0 === e && (e = []);
                    var t = "button",
                      n = this.createElement(t, o(o([], e, !0), ["flex"], !1));
                    return (n.type = t), n;
                  }),
                  (e.prototype.createDiv = function (e) {
                    return (
                      void 0 === e && (e = []), this.createElement("div", e)
                    );
                  }),
                  (e.prototype.createElement = function (e, t) {
                    void 0 === t && (t = []);
                    var n = document.createElement(e);
                    return this.addClasses(n, t), n;
                  }),
                  (e.prototype.createElementFromString = function (e, t) {
                    void 0 === t && (t = []);
                    var n = this.createDiv();
                    n.innerHTML = e.trim();
                    var o = n.firstElementChild;
                    return t && this.addClasses(n.firstElementChild, t), o;
                  }),
                  (e.prototype.createIconButton = function (e) {
                    var t = e.css,
                      n = e.icon,
                      i = e.title,
                      r = e.iconCss,
                      a = this.createButton(o(["icon"], t, !0));
                    (a.innerHTML = ""), (a.title = i);
                    var s = this.createImageIcon({
                      icon: n,
                      iconCss: r,
                      title: i,
                    });
                    return a.appendChild(s), a;
                  }),
                  (e.prototype.createImage = function (e, t, n) {
                    void 0 === t && (t = []);
                    var o = this.createElement("img", t);
                    return (
                      e && (o.src = e),
                      n && (o.alt = n),
                      o.setAttribute("draggable", "false"),
                      o
                    );
                  }),
                  (e.prototype.createImageIcon = function (e) {
                    var t = e.icon,
                      n = e.title,
                      o = e.iconCss;
                    if ((0, a.isSVG)(t)) {
                      var i = this.createElementFromString(t, o);
                      return (
                        i.setAttribute("role", "img"),
                        i.setAttribute("aria-label", n),
                        i
                      );
                    }
                    return this.createImage(t, o, n);
                  }),
                  (e.prototype.createListItem = function (e, t, n, o, i, r, a) {
                    void 0 === a && (a = !1);
                    var s = this.createElement("li", [i, a && "with-sub-menu"]);
                    if (
                      ((s.id = e),
                      (s.tabIndex = -1),
                      s.setAttribute("dir", "auto"),
                      s.setAttribute("role", "menuitem"),
                      n && s.setAttribute("data-value", n),
                      o)
                    ) {
                      var c = this.createImageIcon({
                        icon: o,
                        iconCss: ["icon", "".concat(i, "-icon")],
                        title: t,
                      });
                      s.appendChild(c);
                    }
                    var l = this.createElement("span", [
                      "text",
                      "".concat(i, "-text"),
                      "ellipsis",
                    ]);
                    return (
                      (l.innerText = t),
                      (s.title = t),
                      s.appendChild(l),
                      r && g(s, "click", r),
                      s
                    );
                  }),
                  (e.prototype.createMedia = function (e, t, n) {
                    void 0 === t && (t = []);
                    var o = this.createElement(e, t);
                    return n && (o.src = n), (o.autoplay = !1), o;
                  }),
                  (e.prototype.getBanner = function (e, t) {
                    var n = this,
                      o = this.createDiv(["dialog-wrapper"]),
                      i = "prompt-banner",
                      a = this.createDiv(["".concat(i, "-background")]),
                      s = this.createDiv([
                        "".concat(i, "-main-content"),
                        "flex",
                      ]),
                      c = this.createDiv(["".concat(i, "-content")]),
                      l = this.createDiv([i]);
                    if (e.icon) {
                      var p = this.createImageIcon({ icon: e.icon, title: "" }),
                        h = this.createDiv(["".concat(i, "-icon")]);
                      d(h, p), d(s, h);
                    }
                    var u = this.createDiv(["".concat(i, "-text")]);
                    if (
                      ((u.innerText = e.text),
                      u.setAttribute("role", "alert"),
                      d(c, u),
                      e.description)
                    ) {
                      var f = this.createDiv(["".concat(i, "-description")]);
                      (f.innerText = e.description), d(c, f);
                    }
                    d(s, c), d(l, s);
                    var m = e.closeIcon || r.iconClose,
                      v = "".concat(i, "-close-button"),
                      b = this.createIconButton({
                        css: [v, "flex"],
                        icon: m,
                        title: e.closeText,
                        iconCss: ["".concat(v, "-icon")],
                      }),
                      w = "".concat(i, "-out");
                    g(b, "click", function () {
                      n.addCSSClass(l, w),
                        setTimeout(function () {
                          n.removeCSSClass(l, w), o.remove();
                        }, 200);
                    }),
                      e.autoClose &&
                        setTimeout(function () {
                          b && b.click();
                        }, 6e3);
                    var y = e.actions;
                    if (y && y.length) {
                      var C = this.createDiv(["action-wrapper", "flex"]);
                      y.forEach(function (e) {
                        var o = ["popup-action"];
                        "filled" === e.type && o.push("filled");
                        var i = n.createButton(o);
                        (i.innerHTML = e.label),
                          (i.onclick = e.handler.bind(t)),
                          C.appendChild(i);
                      }),
                        l.appendChild(C);
                    }
                    return d(l, b), d(o, a), d(o, l), o;
                  }),
                  (e.prototype.getMenu = function (e) {
                    var t = this,
                      n = this.createElement(
                        "ul",
                        o(["popup"], e.menuClassList, !0)
                      );
                    (n.id = e.menuId),
                      (n.tabIndex = -1),
                      n.setAttribute("role", "menu"),
                      n.setAttribute("aria-labelledby", e.buttonId);
                    var r = e.menuItems;
                    if (
                      (r.forEach(function (e) {
                        return n.appendChild(e);
                      }),
                      e.defaultValue)
                    ) {
                      var a = n.querySelector(
                        '[data-value="'.concat(e.defaultValue, '"]')
                      );
                      this.addCSSClass(a, "active");
                    }
                    return (
                      g(n, "click", function () {
                        return t.popupClose(n, e.menuButton);
                      }),
                      g(n, "keydown", function (o) {
                        var a = !1;
                        if (!(o.ctrlKey || o.altKey || o.metaKey)) {
                          if (o.shiftKey && o.code === i.KeyCode.Tab)
                            t.popupClose(e.menuButton, n);
                          else
                            switch (o.code) {
                              case i.KeyCode.Return:
                              case i.KeyCode.Space:
                                o.target.click(), (a = !0);
                                break;
                              case i.KeyCode.Esc:
                              case i.KeyCode.Tab:
                                t.popupClose(e.menuButton, n),
                                  o.code === i.KeyCode.Esc && (a = !0);
                                break;
                              case i.KeyCode.Up:
                                t.popupFocusPreviousItem(n), (a = !0);
                                break;
                              case i.KeyCode.Down:
                                t.popupFocusNextItem(n), (a = !0);
                                break;
                              case i.KeyCode.Home:
                              case i.KeyCode.PageUp:
                                t.popupFocusFirstItem(n, r), (a = !0);
                                break;
                              case i.KeyCode.End:
                              case i.KeyCode.PageDown:
                                t.popupFocusLastItem(n, r), (a = !0);
                            }
                          a && (o.stopPropagation(), o.preventDefault());
                        }
                      }),
                      n
                    );
                  }),
                  (e.prototype.getMenuButton = function (e) {
                    var t = this,
                      n = e.button,
                      o = e.menu,
                      r = o.querySelectorAll("li"),
                      a = n.classList.contains(
                        "".concat(this.cssPrefix, "-with-sub-menu")
                      );
                    return (
                      n.setAttribute("role", "button"),
                      n.setAttribute("aria-haspopup", "true"),
                      n.setAttribute("aria-controls", e.menuId),
                      g(n, "click", function () {
                        var o = document.getElementById(e.menuId);
                        n.hasAttribute(s)
                          ? t.popupClose(n, o)
                          : t.popupOpen(n, o, a);
                      }),
                      g(n, "keydown", function (e) {
                        var s = !1;
                        switch (e.code) {
                          case i.KeyCode.Return:
                          case i.KeyCode.Down:
                          case i.KeyCode.Space:
                            t.popupOpen(n, o, a),
                              t.popupFocusFirstItem(o, r),
                              (s = !0);
                            break;
                          case i.KeyCode.Up:
                            t.popupOpen(n, o, a),
                              t.popupFocusLastItem(o, r),
                              (s = !0);
                        }
                        s && (e.stopPropagation(), e.preventDefault());
                      }),
                      n
                    );
                  }),
                  (e.prototype.getMessageBlock = function (e, t, n, o) {
                    void 0 === o && (o = !1);
                    var i = "message",
                      r = this.createDiv(["message-block", "flex", e]),
                      a = this.createDiv(["messages-wrapper"]),
                      s = this.createDiv(["message-list", "flex", "col"]),
                      c = this.createDiv([i]),
                      l = this.createDiv(["message-wrapper"]),
                      p = this.createDiv(["message-bubble", o && "error"]);
                    if (n) {
                      var h = this.createDiv(["icon-wrapper"]);
                      h.appendChild(n), r.appendChild(h);
                    }
                    return (
                      p.appendChild(t),
                      l.appendChild(p),
                      c.appendChild(l),
                      s.appendChild(c),
                      a.appendChild(s),
                      r.appendChild(a),
                      r
                    );
                  }),
                  (e.prototype.linkify = function (e, t) {
                    var n = this,
                      o = (t = t || {}).emHTML ? e : (0, a.sanitizeText)(e),
                      i =
                        o &&
                        o.replace((0, a.resetRegex)(p), function (e, o, i) {
                          return o ? e : n.parseYouTubeOrLink(i, t.emVideo);
                        });
                    return (
                      i &&
                      i.replace((0, a.resetRegex)(h), function (e, o, i, r) {
                        return o || i ? e : n.parseYouTubeOrLink(r, t.emVideo);
                      })
                    );
                  }),
                  (e.prototype.removeCSSClass = function (e) {
                    for (
                      var t, n, o = this, i = [], r = 1;
                      r < arguments.length;
                      r++
                    )
                      i[r - 1] = arguments[r];
                    if (e.classList)
                      i.forEach(function (t) {
                        return e.classList.remove(
                          "".concat(o.cssPrefix, "-").concat(t)
                        );
                      });
                    else {
                      var a = "class",
                        s =
                          null !==
                            (n =
                              null === (t = e.getAttribute(a)) || void 0 === t
                                ? void 0
                                : t.split(" ")) && void 0 !== n
                            ? n
                            : [];
                      if (s.length) {
                        var c = s
                          .filter(function (e) {
                            return (
                              s.indexOf("".concat(o.cssPrefix, "-").concat(e)) <
                              0
                            );
                          })
                          .join(" ");
                        e.setAttribute(a, c);
                      }
                    }
                  }),
                  (e.prototype.addClasses = function (e, t) {
                    return (
                      void 0 === t && (t = []),
                      e.setAttribute("dir", "auto"),
                      t && this.addCSSClass.apply(this, o([e], t, !1)),
                      e
                    );
                  }),
                  (e.prototype.embedYouTube = function (e) {
                    return (
                      '<div class="'
                        .concat(
                          this.cssPrefix,
                          '-youtube-wrapper"><iframe width="100%" src="https://www.youtube.com/embed/'
                        )
                        .concat(e, '" frameborder="0" ') +
                      'allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>'
                    );
                  }),
                  (e.prototype.parseYouTubeOrLink = function (e, t) {
                    var n = t ? (0, a.getYouTubeID)(e) : null;
                    return n
                      ? this.embedYouTube(n)
                      : '<a href="'
                          .concat(e, '" target="_blank">')
                          .concat(e, "</a>");
                  }),
                  (e.prototype.popupClose = function (e, t) {
                    e.getAttribute(s) &&
                      (this.removeCSSClass(t, l), e.removeAttribute(s));
                  }),
                  (e.prototype.popupFocusFirstItem = function (e, t) {
                    this.popupFocusItem(t[0], e);
                  }),
                  (e.prototype.popupFocusLastItem = function (e, t) {
                    this.popupFocusItem(t[t.length - 1], e);
                  }),
                  (e.prototype.popupFocusPreviousItem = function (e) {
                    var t = e.getAttribute(c),
                      n = e.querySelector("#".concat(t));
                    this.popupFocusItem(n.previousSibling || e.lastChild, e);
                  }),
                  (e.prototype.popupFocusNextItem = function (e) {
                    var t = e.getAttribute(c),
                      n = e.querySelector("#".concat(t));
                    this.popupFocusItem(n.nextSibling || e.firstChild, e);
                  }),
                  (e.prototype.popupFocusItem = function (e, t) {
                    e.focus(), t.setAttribute(c, e.id);
                  }),
                  (e.prototype.popupOpen = function (e, t, n) {
                    var o = this;
                    if ((void 0 === n && (n = !1), !e.getAttribute(s))) {
                      this.addCSSClass(t, l), e.setAttribute(s, "true");
                      var i = document.querySelector(
                          ".".concat(this.cssPrefix, "-widget")
                        ),
                        r = i.getBoundingClientRect(),
                        a = e.getBoundingClientRect(),
                        c = "rtl" === window.getComputedStyle(t).direction;
                      if (n)
                        (t.style.top = "".concat(
                          e.offsetTop + e.offsetHeight + 60,
                          "px"
                        )),
                          c
                            ? (t.style.left = "".concat(48, "px"))
                            : (t.style.right = "".concat(48, "px")),
                          (t.style.maxWidth = "".concat(
                            i.offsetWidth - 48,
                            "px"
                          ));
                      else {
                        var p = r.right - a.right;
                        c
                          ? ((p = a.left - r.left),
                            (t.style.left = "".concat(p, "px")))
                          : (t.style.right = "".concat(p, "px")),
                          (t.style.maxWidth = "".concat(
                            i.offsetWidth - p,
                            "px"
                          ));
                      }
                      setTimeout(function () {
                        var n = document.querySelectorAll(
                          ".".concat(o.cssPrefix, "-with-sub-menu")
                        );
                        document.addEventListener(
                          "click",
                          function (i) {
                            var r = !1;
                            n.forEach(function (e) {
                              e.contains(i.target) && (r = !0);
                            }),
                              r
                                ? o.openPopupList.push({
                                    menu: t,
                                    menuButton: e,
                                  })
                                : (o.openPopupList.length &&
                                    o.openPopupList.forEach(function (e) {
                                      o.popupClose(e.menuButton, e.menu);
                                    }),
                                  o.popupClose(e, t));
                          },
                          { once: !0 }
                        );
                      });
                    }
                  }),
                  e
                );
              })();
            function d(e, t) {
              e.appendChild(t);
            }
            function g(e, t, n, o) {
              e.addEventListener(t, n, o);
            }
            (t.DOMUtil = u),
              (t.addChild = d),
              (t.isElemVisible = function (e, t) {
                var n = e.scrollTop,
                  o = n + e.offsetHeight,
                  i = t.offsetTop,
                  r = i + t.offsetHeight;
                return (
                  (o > i && o < r) ||
                  (n < r && o > r) ||
                  (n < i && o > r) ||
                  (n > i && o < r)
                );
              }),
              (t.on = g);
          },
          8674: function (e, t, n) {
            var o =
              (this && this.__spreadArray) ||
              function (e, t, n) {
                if (n || 2 === arguments.length)
                  for (var o, i = 0, r = t.length; i < r; i++)
                    (!o && i in t) ||
                      (o || (o = Array.prototype.slice.call(t, 0, i)),
                      (o[i] = t[i]));
                return e.concat(o || Array.prototype.slice.call(t));
              };
            Object.defineProperty(t, "__esModule", { value: !0 }),
              (t.generateEventDispatcher = void 0);
            var i = n(5081),
              r = n(8798);
            t.generateEventDispatcher = function () {
              var e = {},
                t = new r.Logger("event");
              return {
                bind: function (t, n) {
                  t &&
                    n &&
                    (0, i.isFunction)(n) &&
                    (e.hasOwnProperty(t) ? e[t].push(n) : (e[t] = [n]));
                },
                trigger: function (n) {
                  for (var i = [], r = 1; r < arguments.length; r++)
                    i[r - 1] = arguments[r];
                  e.hasOwnProperty(n) &&
                    ((i = null != i ? i : []),
                    e[n].forEach(function (e) {
                      try {
                        e.call.apply(e, o([null], i, !1));
                      } catch (e) {
                        t.error("".concat(n, " listener threw error"), e);
                      }
                    }));
                },
                unbind: function (t, n) {
                  t
                    ? n
                      ? (e[t] = e[t].filter(function (e) {
                          return e !== n;
                        }))
                      : e.hasOwnProperty(t) && e[t].splice(0, e[t].length)
                    : (e = {});
                },
              };
            };
          },
          9594: function () {
            Number.isInteger =
              Number.isInteger ||
              function (e) {
                return (
                  "number" == typeof e && isFinite(e) && Math.floor(e) === e
                );
              };
          },
          8952: function () {
            [
              Element.prototype,
              Document.prototype,
              DocumentFragment.prototype,
            ].forEach(function (e) {
              e.hasOwnProperty("prepend") ||
                Object.defineProperty(e, "prepend", {
                  configurable: !0,
                  enumerable: !0,
                  writable: !0,
                  value: function () {
                    var e = Array.prototype.slice.call(arguments),
                      t = document.createDocumentFragment();
                    e.forEach(function (e) {
                      var n = e instanceof Node;
                      t.appendChild(n ? e : document.createTextNode(String(e)));
                    }),
                      this.insertBefore(t, this.firstChild);
                  },
                });
            });
          },
          6400: function () {
            [
              Element.prototype,
              CharacterData.prototype,
              DocumentType.prototype,
            ].forEach(function (e) {
              e.hasOwnProperty("remove") ||
                Object.defineProperty(e, "remove", {
                  configurable: !0,
                  enumerable: !0,
                  writable: !0,
                  value: function () {
                    this.parentNode && this.parentNode.removeChild(this);
                  },
                });
            });
          },
          1389: function (e, t) {
            Object.defineProperty(t, "__esModule", { value: !0 }),
              (t.iconZoom =
                t.iconWarn =
                t.iconVideo =
                t.iconTTSUnmute =
                t.iconTTSMute =
                t.iconShareMedia =
                t.iconShareLocation =
                t.iconShareFile =
                t.iconShareAudio =
                t.iconSend =
                t.iconRating =
                t.iconMic =
                t.iconLogo =
                t.iconLaunchButton =
                t.iconLanguage =
                t.iconKeyboard =
                t.iconImage =
                t.iconFile =
                t.iconExternalLink =
                t.iconExpandArrow =
                t.iconExpand =
                t.iconError =
                t.iconDownload =
                t.iconCollapse =
                t.iconClose =
                t.iconClearHistory =
                t.iconChevronPrevious =
                t.iconChevronNext =
                t.iconChevronDown =
                t.iconAudio =
                t.iconAttach =
                  void 0);
            var n = M(
              '<path d="M11.007 15.117A1 1 0 0 0 13 15V7l-.005-.176A3 3 0 0 0 7 7v8l.005.217A5 5 0 0 0 17 15V5h2v10a7 7 0 1 1-14 0V7a5 5 0 0 1 10 0v8l-.005.176A3 3 0 0 1 9 15V9h2v6z"/>'
            );
            t.iconAttach = n;
            var o = M(
              '<path d="M4 2h10.414L20 7.586V10h-2V9h-5V4H6v16h12v-1h2v3H4zm11 3.414L16.586 7H15z"/><path d="m7.764 17 1.849-4.87h1.012L12.486 17H11.32l-.32-.998H9.204L8.882 17zm1.722-1.883h1.226l-.617-1.916zm3.278-.415v-2.573h1.045v2.553c0 .531.079.916.235 1.152.156.233.404.349.744.349.344 0 .591-.116.743-.349.157-.236.235-.62.235-1.152v-2.553h1.045v2.573c0 .822-.165 1.427-.496 1.816-.326.384-.835.576-1.527.576s-1.204-.192-1.535-.576c-.326-.389-.489-.994-.489-1.816zM17.686 17v-4.87h1.635c.795 0 1.396.205 1.802.616.407.41.61 1.018.61 1.822 0 .795-.203 1.4-.61 1.816-.402.41-1.002.616-1.802.616zm1.622-4.02h-.577v3.17h.577c.45 0 .786-.128 1.005-.383.223-.259.335-.659.335-1.2s-.11-.94-.329-1.198c-.218-.26-.556-.389-1.011-.389z"/>'
            );
            t.iconAudio = o;
            var i = M(
              '<path d="M6.35 8L5 9.739 12 16l7-6.261L17.65 8 12 13.054z"/>'
            );
            t.iconChevronDown = i;
            var r = M(
              '<path d="M8 17.65L9.739 19 16 12 9.739 5 8 6.35 13.054 12z"/>'
            );
            t.iconChevronNext = r;
            var a = M(
              '<path d="M16 17.65L14.261 19 8 12l6.261-7L16 6.35 10.946 12z"/>'
            );
            t.iconChevronPrevious = a;
            var s = M(
              '<path d="M6 11h8v2H6zm0-4h12v2H6z"/><path d="M2 2v20h3.5l3-4H14v-2H7.5l-3 4H4V4h16v6h2V2z"/><path d="M20.3 12.3L19 13.6l-1.3-1.3-1.4 1.4 1.3 1.3-1.3 1.3 1.4 1.4 1.3-1.3 1.3 1.3 1.4-1.4-1.3-1.3 1.3-1.3z"/>'
            );
            t.iconClearHistory = s;
            var c = M(
              '<path d="M17.524 5 19 6.476 13.475 12 19 17.524 17.524 19 12 13.475 6.476 19 5 17.524 10.525 12 5 6.476 6.476 5 12 10.525z"/>'
            );
            t.iconClose = c;
            var l = M(
              '<path d="M11 13v9H9v-5.586l-6.293 6.293-1.414-1.414L7.586 15H2v-2zM21.293 1.293l1.414 1.414L16.414 9H22v2h-9V2h2v5.586z"/>'
            );
            t.iconCollapse = l;
            var p = M(
              '<path d="M4 15v5h16v-5h2v7H2v-7zm9-13v10.587l3.293-3.294 1.414 1.414L12 16.414l-5.707-5.707 1.414-1.414L11 12.585V2z"/>'
            );
            t.iconDownload = p;
            var h = M(
              '<path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zM8.707 7.293l8 8-1.414 1.414-8-8z"/></svg>'
            );
            (t.iconError = h),
              (t.iconExpand =
                '<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path d="M4.99935 9.99967C4.99935 10.9201 4.25316 11.6663 3.33268 11.6663C2.41221 11.6663 1.66602 10.9201 1.66602 9.99967C1.66602 9.0792 2.41221 8.33301 3.33268 8.33301C4.25316 8.33301 4.99935 9.0792 4.99935 9.99967Z" fill="#161513"/><path d="M11.666 9.99967C11.666 10.9201 10.9198 11.6663 9.99935 11.6663C9.07887 11.6663 8.33268 10.9201 8.33268 9.99967C8.33268 9.0792 9.07887 8.33301 9.99935 8.33301C10.9198 8.33301 11.666 9.0792 11.666 9.99967Z" fill="#161513"/><path d="M18.3327 9.99967C18.3327 10.9201 17.5865 11.6663 16.666 11.6663C15.7455 11.6663 14.9993 10.9201 14.9993 9.99967C14.9993 9.0792 15.7455 8.33301 16.666 8.33301C17.5865 8.33301 18.3327 9.0792 18.3327 9.99967Z" fill="#161513"/></svg'),
              (t.iconExpandArrow =
                '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6 9L11.9746 15L18 9H6Z" fill="#161513"/></svg>');
            var u = M(
              '<path class="st0" d="M20 20H4V4h7V2H2v20h20v-9h-2z"/><path xmlns="http://www.w3.org/2000/svg" class="st0" d="M14 2v2h4.6L8.3 14.3l1.4 1.4L20 5.4V10h2V2z"/>'
            );
            t.iconExternalLink = u;
            var d = M(
              '<path d="M14.414 2 21 8.584V22H3V2.009zM13 3.999l-8 .007v15.995h14V9.996l-6 .001zm4.585 3.998L15 5.413v2.585z"/>'
            );
            t.iconFile = d;
            var g = M(
              '<path d="M4 2h10.414L20 7.586V22H4zm2 2v16h12V9h-5V4zm9 1.414L16.586 7H15z"/><path d="M16 12a1 1 0 11-2 0 1 1 0 012 0zm-6.143 1L7 19h10l-2.857-4.5L12 16.75z"/>'
            );
            t.iconImage = g;
            var f = M(
              '<path d="M22 5v14H2V5zm-2 2H4v10h16zM7 13v2H5v-2zm12 0v2h-2v-2zm-4 0v2H9v-2zM7 9v2H5V9zm12 0v2h-2V9zm-4 0v2h-2V9zm-4 0v2H9V9z" />'
            );
            t.iconKeyboard = f;
            var m = M(
              '<path d="M13 14c-1.5 0-2.9-.4-4-1.1 1.1-2.4 1.7-5 1.9-6.9h9V4H7V2H5v2H2v2h6.9c-.2 1.7-.7 3.7-1.5 5.6C6.5 10.5 6 9.2 6 8H4c0 1.9.9 4 2.5 5.5C5.3 15.5 3.8 17 2 17v2c2.6 0 4.6-1.9 6.1-4.3 1.4.8 3 1.3 4.9 1.3zm7.6 4.6L17 10.5l-3.6 8.1-1.3 3 1.8.8L15 20h4l1.1 2.4 1.8-.8zm-4.7-.6l1.1-2.5 1.1 2.5z"/>'
            );
            (t.iconLanguage = m),
              (t.iconLaunchButton =
                '<svg width="36" height="36" viewBox="0 0 36 36"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.875 8.625a2.25 2.25 0 00-2.25 2.25v16c0 .621.504 1.125 1.125 1.125h.284c.298 0 .585-.119.796-.33l2.761-2.76a2.25 2.25 0 011.59-.66h15.944a2.25 2.25 0 002.25-2.25V10.875a2.25 2.25 0 00-2.25-2.25H7.875zM24.75 18a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5zm-4.5-2.25a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-9 2.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" fill="#fff"/></svg>');
            var v = M(
              '<path d="M4.014 3C2.911 3 2 3.888 2 4.992v15c0 .6.408 1.008 1.007 1.008h.6a.887.887 0 0 0 .695-.288l3.094-3.12c.407-.384.91-.6 1.415-.6h11.175C21.089 16.992 22 16.104 22 15V4.992C22 3.888 21.089 3 19.986 3zm3.981 7.008A1.986 1.986 0 0 1 6.005 12c-1.103 0-1.99-.888-1.99-1.992s.887-2.016 1.99-2.016 1.99.912 1.99 2.016zm5.995 0C13.99 11.112 13.103 12 12 12s-1.99-.888-1.99-1.992.887-2.016 1.99-2.016 1.99.912 1.99 2.016zm5.996 0c0 1.104-.888 1.992-1.99 1.992s-1.991-.888-1.991-1.992.887-2.016 1.99-2.016 1.99.912 1.99 2.016z" fill="#fff"/>'
            );
            t.iconLogo = v;
            var b = M(
              '<path d="M7 22v-2h4v-2.062C7.06 17.444 4 14.073 4 10h2c0 3.309 2.691 6 6 6s6-2.691 6-6h2c0 4.072-3.059 7.444-7 7.938V20h4v2h-6zm5-20c2.206 0 4 1.794 4 4v4c0 2.206-1.794 4-4 4s-4-1.794-4-4V6c0-2.206 1.794-4 4-4zm0 2c-1.103 0-2 .897-2 2v4c0 1.103.897 2 2 2s2-.897 2-2V6c0-1.103-.897-2-2-2z"/>'
            );
            t.iconMic = b;
            var w = M(
              '<path d="M19.33 23.02l-7.332-3.666-7.332 3.666 1.418-7.995L1 9.555l7.331-1.222L11.998 1l3.666 7.333 7.332 1.222-5.084 5.47z"/>'
            );
            t.iconRating = w;
            var y = M(
              '<path d="M13 22V5.414l5.293 5.293 1.414-1.414L12 1.585 4.293 9.293l1.414 1.414L11 5.414V22h2z" fill="#161513"/>'
            );
            t.iconSend = y;
            var C = M(
              '<path d="M22 2v20H2V2zm-2 2H4v16h16zm-3 1.674V14a2 2 0 11-2.15-1.995L15 12V8.326l-5 1.428V16a2 2 0 11-2.15-1.995L8 14V8.246z"/>'
            );
            t.iconShareAudio = C;
            var x = M(
              '<path d="M13.414 2L17 5.586V7h.414L21 10.586V22H7v-4H3V2zM17 9.414V18H9v2h10v-8.586zm-2-3L12.586 4H5v12h10zM13 11v2H7v-2zm-2-4v2H7V7z"/>'
            );
            t.iconShareFile = x;
            var _ = M(
              '<path d="M12 2c3.874 0 6.994 3.28 6.99 7.214l.011.285c.008.927-.202 2.23-.787 3.837-.96 2.639-2.73 5.452-5.49 8.353L12 22.45l-.724-.761c-2.76-2.901-4.53-5.714-5.49-8.353-.627-1.722-.823-3.095-.782-4.03l.006-.252C5.134 5.147 8.205 2 12 2zm0 2C9.254 4 7.006 6.362 7.002 9.386L7 9.529c-.004.694.168 1.753.667 3.123.741 2.036 2.038 4.221 4.014 6.507l.32.365.32-.365c1.867-2.159 3.127-4.228 3.886-6.166l.128-.34c.535-1.469.694-2.58.664-3.259l-.008-.32C16.879 6.244 14.676 4 12 4zm0 2a3 3 0 1 1-.001 6A3 3 0 0 1 12 6zm0 2a1 1 0 1 0 .001 2A1 1 0 0 0 12 8z"/>'
            );
            t.iconShareLocation = _;
            var S = M(
              '<path d="M22 2v16h-4v4H2V6h4V2zm-9.036 12.378L6.93 20H16v-2.585zM16 8H4v11.999l9.036-8.377L16 14.585zm4-4H8v2h10v10h2zM7 9a2 2 0 110 4 2 2 0 010-4z"/>'
            );
            t.iconShareMedia = S;
            var T = M(
              '<path d="M1.707.293l22 22-1.414 1.414L12 13.414V21l-6.35-5.114H1V7.954h4.65l.5-.39L.293 1.707zM19.67 4.446c2.119 1.967 3.302 4.613 3.33 7.452a10.363 10.363 0 01-1.392 5.295l-1.476-1.476c.58-1.18.88-2.472.868-3.8-.023-2.29-.981-4.43-2.697-6.025zM7.583 8.996l-1.232.955H3v3.964h3.351L10 16.875v-5.461zm8.051-1.68C17.15 8.547 17.991 10.21 18 11.999c.003.482-.055.956-.17 1.416l-1.86-1.86c-.133-1.017-.691-1.964-1.604-2.706zM12 3v4.586L9.424 5.01z"/>'
            );
            t.iconTTSMute = T;
            var A = M(
              '<path d="M13 3v18l-6.35-5.114H2V7.954h4.65zm5.67 1.446c2.119 1.967 3.302 4.613 3.33 7.452.029 2.904-1.15 5.658-3.316 7.75l-1.396-1.421c1.772-1.71 2.735-3.95 2.712-6.31-.023-2.29-.981-4.43-2.697-6.025zM11 7.125L7.351 9.95H4v3.964h3.351L11 16.875zm4.634.19C17.15 8.548 17.991 10.212 18 12c.01 1.806-.828 3.5-2.358 4.771l-1.284-1.519c1.065-.885 1.65-2.037 1.642-3.242-.006-1.187-.587-2.309-1.634-3.16z"/>'
            );
            t.iconTTSUnmute = A;
            var I = M(
              '<path d="M4 2h10.414L20 7.586V10h-2V9h-5V4H6v16h12v-1h2v3H4zm11 3.414L16.586 7H15z"/><path d="m12.36 17-1.796-4.87h1.18l1.138 3.584 1.153-3.585h1.132L13.37 17zm3.33 0v-4.87h1.046V17zm1.996 0v-4.87h1.635c.795 0 1.396.205 1.802.616.407.41.61 1.018.61 1.822 0 .795-.203 1.4-.61 1.816-.402.41-1.002.616-1.802.616zm1.622-4.02h-.577v3.17h.577c.45 0 .786-.128 1.005-.383.223-.259.335-.659.335-1.2s-.11-.94-.329-1.198c-.218-.26-.556-.389-1.011-.389z"/>'
            );
            t.iconVideo = I;
            var E = M(
              '<path d="M11 11h2v4h-2zm0 6h2v2h-2z"/><path d="M12 1.8L1.9 22h20.2L12 1.8zm0 4.4L18.9 20H5.1L12 6.2z"/>'
            );
            t.iconWarn = E;
            var k = M(
              '<path d="M11 2a9 9 0 017.032 14.617l3.675 3.676-1.414 1.414-3.676-3.675A9 9 0 1111 2zm0 2a7 7 0 100 14 7 7 0 000-14zm1 3v3h3v2h-3v3h-2v-3H7v-2h3V7z"/>'
            );
            function M(e) {
              return '<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 24 24">'.concat(
                e,
                "</svg>"
              );
            }
            t.iconZoom = k;
          },
          5949: function (e, t, n) {
            Object.defineProperty(t, "__esModule", { value: !0 }),
              (t.updateCSSVar =
                t.getColor =
                t.debounce =
                t.configureLocale =
                t.syncTTSLocaleIfUnavailable =
                t.skipHTTPS =
                t.setObjectReadOnly =
                t.setLinksOpenInNewWindow =
                t.setEmbeddedLinksHandler =
                t.sanitizeText =
                t.resetRegex =
                t.matchStringIgnoreCase =
                t.getYouTubeID =
                t.isSVG =
                t.isInteger =
                t.isFeedbackComponent =
                t.isAnyVoiceAvailable =
                t.getValues =
                t.deepFreeze =
                  void 0);
            var o = n(8656);
            (t.deepFreeze = function e(t) {
              for (var n = 0, o = Object.keys(t); n < o.length; n++) {
                var i = t[o[n]];
                i && "object" == typeof i && e(i);
              }
              return Object.freeze(t);
            }),
              (t.getValues = function (e) {
                var t = [];
                if ("object" == typeof e && null !== e)
                  for (var n = 0, o = Object.keys(e); n < o.length; n++) {
                    var i = o[n];
                    t.push(e[i]);
                  }
                return t;
              }),
              (t.isAnyVoiceAvailable = function (e, t) {
                if (!t) return Promise.resolve(!1);
                if ((Array.isArray(t) || (t = [t]), !t.length))
                  return Promise.resolve(!1);
                var n = t.map(function (e) {
                  var t;
                  return null === (t = e.lang) || void 0 === t
                    ? void 0
                    : t.toLowerCase();
                });
                return e.getVoices().then(function (e) {
                  for (
                    var t = !1,
                      o = e.map(function (e) {
                        return e.lang.toLowerCase();
                      }),
                      i = 0,
                      r = n;
                    i < r.length;
                    i++
                  ) {
                    var a = r[i];
                    if (o.indexOf(a) >= 0) {
                      t = !0;
                      break;
                    }
                  }
                  return t;
                });
              }),
              (t.isFeedbackComponent = function (e) {
                return void 0 !== e.ratingId;
              }),
              (t.isInteger = function (e) {
                return (
                  "number" == typeof e && isFinite(e) && Math.floor(e) === e
                );
              }),
              (t.isSVG = function (e) {
                var t = e.match(/<svg\s/gi);
                return t && t.length > 0;
              });
            var i = /(youtube\.com\/watch\?v=|youtu.be\/)([^#&?\s]*)/gim;
            function r(e) {
              return (e.lastIndex = 0), e;
            }
            (t.getYouTubeID = function (e) {
              var t;
              return (
                e.replace(r(i), function (e, n, o) {
                  return o && o.length && (t = o), e;
                }),
                t
              );
            }),
              (t.matchStringIgnoreCase = function (e, t) {
                return (e = e.toLowerCase()) === (t = t.toLowerCase());
              }),
              (t.resetRegex = r);
            var a,
              s = [
                {
                  match: /<([a-z])/gi,
                  replace: function (e, t) {
                    return "&#x3c;".concat(t);
                  },
                },
                {
                  match: /<\/([a-z])/gi,
                  replace: function (e, t) {
                    return "&#x3c;&#47;".concat(t);
                  },
                },
              ];
            function c(e, t) {
              for (var n in ((e = e.toLowerCase()), t))
                if (e === n.toLowerCase()) return !0;
              return !1;
            }
            function l(e, t) {
              for (var n in ((e = e.toLowerCase().split("-")[0]), t))
                if (e === n.toLowerCase()) return !0;
              return !1;
            }
            (t.sanitizeText = function (e) {
              return (
                s.forEach(function (t) {
                  e = e.replace(r(t.match), t.replace);
                }),
                e
              );
            }),
              (t.setEmbeddedLinksHandler = function e(t, n) {
                for (var o = 0; o < t.childElementCount; o++) {
                  var i = t.children[o];
                  if ("a" === i.tagName.toLowerCase()) {
                    var r = i;
                    (r.rel = "noreferrer noopener"),
                      n.onclick && (r.onclick = n.onclick.bind(r)),
                      n.target && (r.target = n.target);
                  }
                  i.hasChildNodes() && e(i, n);
                }
              }),
              (t.setLinksOpenInNewWindow = function e(t) {
                for (
                  var n = function (n) {
                      var o = t.children[n];
                      "a" === o.tagName.toLowerCase() &&
                        (o.onclick = function (e) {
                          return (
                            window.open(
                              o.href,
                              "",
                              "height=450px,width=800px,menubar,toolbar,personalbar,status,resizable,noopener,noreferrer"
                            ),
                            e.preventDefault(),
                            e.stopPropagation(),
                            !1
                          );
                        }),
                        o.hasChildNodes() && e(o);
                    },
                    o = 0;
                  o < t.childElementCount;
                  o++
                )
                  n(o);
              }),
              (t.setObjectReadOnly = function (e) {
                for (
                  var t = 0, n = Object.getOwnPropertyNames(e);
                  t < n.length;
                  t++
                ) {
                  var o = n[t];
                  Object.defineProperty(e, o, {
                    configurable: !0,
                    writable: !1,
                  });
                }
                return e;
              }),
              (t.skipHTTPS = function (e) {
                return e.replace(/^https?\:\/\//i, "");
              }),
              (t.syncTTSLocaleIfUnavailable =
                ((a = !1),
                function (e) {
                  var t;
                  void 0 === e &&
                    (e = {
                      hasRecognition: !1,
                      hasSynthesis: !1,
                      isReset: !1,
                      recognitionLocale: "",
                      synthesisLocales: [],
                    }),
                    e.isReset && (a = !1);
                  var n = e.synthesisLocales;
                  return (
                    Array.isArray(n) || (n = []),
                    e.hasRecognition &&
                      e.hasSynthesis &&
                      (null === (t = e.recognitionLocale) || void 0 === t
                        ? void 0
                        : t.length) &&
                      ((!a && e.synthesisLocales.length) ||
                        ((a = !0), (n = [{ lang: e.recognitionLocale }]))),
                    n
                  );
                })),
              (t.configureLocale = function (e, t) {
                var n = [e.toLowerCase()],
                  i = "en";
                (n = n.concat((0, o.getLocales)())).indexOf(i) < 0 && n.push(i);
                for (var r = 0, a = n; r < a.length; r++) {
                  var s = a[r];
                  if (c(s, t)) {
                    i = s;
                    break;
                  }
                  if (l(s, t)) {
                    i = s.split("-")[0];
                    break;
                  }
                }
                return i;
              }),
              (t.debounce = function (e, t) {
                var n;
                return function () {
                  var o = this,
                    i = arguments,
                    r = function () {
                      (n = null), e.apply(o, i);
                    };
                  clearTimeout(n), (n = setTimeout(r, t));
                };
              }),
              (t.getColor = function (e) {
                var t = document.querySelector(".oda-chat-wrapper");
                return getComputedStyle(t).getPropertyValue(e);
              }),
              (t.updateCSSVar = function (e, t, n) {
                return e.replace(
                  new RegExp("(".concat(n, ": )(.*?)(;)"), "g"),
                  "$1" + t + "$3"
                );
              });
          },
          8656: function (e, t, n) {
            Object.defineProperty(t, "__esModule", { value: !0 }),
              (t.isStorageAvailable =
                t.isLocationServiceAvailable =
                t.getLocales =
                t.getCurrentLocation =
                t.getBrowserLocale =
                  void 0);
            var o = n(9297);
            (t.getBrowserLocale = function () {
              return navigator.language.toLowerCase();
            }),
              (t.getCurrentLocation = function () {
                return (0, t.isLocationServiceAvailable)()
                  ? new o.default(function (e, t) {
                      navigator.geolocation.getCurrentPosition(
                        function (t) {
                          e(t);
                        },
                        function (e) {
                          t(e);
                        },
                        { timeout: 5e3 }
                      );
                    })
                  : o.default.reject(
                      new Error("Location service is not available.")
                    );
              }),
              (t.getLocales = function () {
                var e;
                return (
                  (null === (e = navigator.languages) || void 0 === e
                    ? void 0
                    : e.map(function (e) {
                        return e.toLowerCase();
                      })) || []
                );
              }),
              (t.isLocationServiceAvailable = function () {
                return navigator && navigator.geolocation;
              }),
              (t.isStorageAvailable = function (e) {
                return i(e);
              });
            var i = function (e) {
              var t;
              try {
                t = window[e];
                var n = "__storage_test__";
                return t.setItem(n, n), t.removeItem(n), !0;
              } catch (e) {
                return (
                  e instanceof DOMException &&
                  (22 === e.code ||
                    1014 === e.code ||
                    "QuotaExceededError" === e.name ||
                    "NS_ERROR_DOM_QUOTA_REACHED" === e.name) &&
                  t &&
                  0 !== t.length
                );
              }
            };
          },
          7214: function (e, t, n) {
            var o,
              i =
                (this && this.__extends) ||
                ((o = function (e, t) {
                  return (o =
                    Object.setPrototypeOf ||
                    ({ __proto__: [] } instanceof Array &&
                      function (e, t) {
                        e.__proto__ = t;
                      }) ||
                    function (e, t) {
                      for (var n in t)
                        Object.prototype.hasOwnProperty.call(t, n) &&
                          (e[n] = t[n]);
                    })(e, t);
                }),
                function (e, t) {
                  if ("function" != typeof t && null !== t)
                    throw new TypeError(
                      "Class extends value " +
                        String(t) +
                        " is not a constructor or null"
                    );
                  function n() {
                    this.constructor = e;
                  }
                  o(e, t),
                    (e.prototype =
                      null === t
                        ? Object.create(t)
                        : ((n.prototype = t.prototype), new n()));
                }),
              r =
                (this && this.__assign) ||
                function () {
                  return (r =
                    Object.assign ||
                    function (e) {
                      for (var t, n = 1, o = arguments.length; n < o; n++)
                        for (var i in (t = arguments[n]))
                          Object.prototype.hasOwnProperty.call(t, i) &&
                            (e[i] = t[i]);
                      return e;
                    }).apply(this, arguments);
                };
            Object.defineProperty(t, "__esModule", { value: !0 }),
              (t.WidgetComponent = void 0);
            var a = n(9297),
              s = n(3145),
              c = n(4534),
              l = n(1389),
              p = n(5949),
              h = n(4230),
              u = n(8414),
              d = n(3777),
              g = n(2365),
              f = n(2304),
              m = n(8798),
              v = n(1001),
              b = n(2401),
              w = n(9176),
              y = n(7332),
              C = n(7496),
              x = n(1489),
              _ = n(8674),
              S = n(8656),
              T = n(2466),
              A = n(9622),
              I = n(8861),
              E = n(9978),
              k = n(6166),
              M = n(5081),
              L = n(2601),
              O = window.BroadcastChannel,
              P = (function (e) {
                function t(t, n, o, i, r, a, c, l, p, h, u) {
                  var d,
                    g,
                    f = e.call(this) || this;
                  return (
                    (f.settings = t),
                    (f.util = n),
                    (f.openChat = o),
                    (f.closeChat = i),
                    (f.handleSessionEnd = r),
                    (f.receiveMessage = a),
                    (f.sentMessage = c),
                    (f.getUnreadMessagesCount = l),
                    (f.onConnectionStatusChange = p),
                    (f._core = h),
                    (f._eventDispatcher = u),
                    (f.FINAL_RESULT_DISPLAY_TIMEOUT = 200),
                    (f._logger = new m.Logger("ChatComponent")),
                    (f._attachmentDivs = []),
                    (f._unreadMessages = []),
                    (f._latestSkillMessages = []),
                    (f._skillMessages = []),
                    (f._isNewMessage = !0),
                    (f.isTTSMute = !0),
                    (f.isInitMessageSent = !1),
                    (f.isExpanded = !1),
                    (f.isFirstMessage = !0),
                    (f.isResponseReceived = !1),
                    (f.messageIDs = []),
                    (f.cssPrefix = t.name),
                    (f.currentLocale = t.locale),
                    (f._localeText = t.i18n[t.locale]),
                    (f.isOpen = t.openChatOnLoad),
                    (f.isExpanded =
                      "init" ===
                        (null === (d = t.initMessageOptions) || void 0 === d
                          ? void 0
                          : d.sendAt) ||
                      t.openChatOnLoad ||
                      t.embedded),
                    (f.isInitMessageSent = t.enableHeadless),
                    (f._isFirstConnect = !0),
                    (f.enableDefaultBotResponse =
                      f.settings.enableDefaultClientResponse),
                    (f.observer = (0, _.generateEventDispatcher)()),
                    f._configureStorage(),
                    f.settings.enableEndConversation &&
                      ((f.endConversationPrompt = n.getBanner(
                        {
                          text:
                            f._localeText.endConversationConfirmMessage || "",
                          description:
                            f._localeText.endConversationDescription || "",
                          actions: [
                            {
                              label: f._localeText.noText,
                              handler: f.closePrompt,
                            },
                            {
                              label: f._localeText.yesText,
                              handler: f.endConversation,
                              type: "filled",
                            },
                          ],
                        },
                        f
                      )),
                      n.addCSSClass(
                        f.endConversationPrompt,
                        "end-conversation-prompt"
                      )),
                    f.settings.enableTabsSync ||
                      (f._initBroadcaster = function () {}),
                    f._core.on(k.CoreEvent.Open, function () {
                      return f._sendInitMessages();
                    }),
                    f._core.on(k.CoreEvent.State, function (e) {
                      return f._onChatServerStatusChange(e);
                    }),
                    f._core.on(k.CoreEvent.MessageReceived, function (e) {
                      return f._onMessageReceived(e);
                    }),
                    (f.element = f._createElement()),
                    f.settings.enableBotAudioResponse &&
                      (f.isTTSMute = f.settings.initBotAudioMuted),
                    f._initMultiLangChat(),
                    "function" != typeof p &&
                      (f.onConnectionStatusChange = function () {}),
                    f.settings.showTypingIndicator &&
                      (f.typingIndicator = new y.TypingIndicatorComponent(
                        s.MESSAGE_SIDE.LEFT,
                        t,
                        n
                      )),
                    !f.settings.enableTimestamp ||
                    ("relative" !== f.settings.timestampMode &&
                      "default" !== f.settings.timestampMode)
                      ? ((f.setTimestampHeaderIfNewDate = function () {}),
                        (f.updateRelativeTimestamp = function () {}))
                      : (f.relativeTimestamp = new A.RelativeTimestampComponent(
                          t,
                          n
                        )),
                    "action" !==
                      (null === (g = f.settings.focusOnNewMessage) ||
                      void 0 === g
                        ? void 0
                        : g.toLowerCase()) &&
                      (f.focusMessageFirstAction = function () {}),
                    f
                  );
                }
                return (
                  i(t, e),
                  (t.prototype.render = function (e) {}),
                  (t.prototype.embedInElement = function (e) {
                    var t = document.getElementById(e);
                    if (!t) throw new Error("Can not embed chat widget.");
                    this.util.addCSSClass(t, "wrapper", "embedded"),
                      this.appendToElement(t);
                  }),
                  (t.prototype.showChat = function () {
                    var e = this;
                    if (!this.isOpen) {
                      var t = this.util,
                        n = "none";
                      t.removeCSSClass(this.element, "collapsed"),
                        t.addCSSClass(this.element, "expanded"),
                        t.removeCSSClass(this.chatWidgetDiv, n),
                        this.settings.embedded ||
                          setTimeout(function () {
                            t.addCSSClass(e._botButton, n);
                          }, 250),
                        (this.isOpen = !0),
                        (this.isExpanded = !0),
                        this._updateUnreadMessages(),
                        this._scrollToBottom(),
                        this.footer.focusTextArea(),
                        this.observer.trigger(C.ChatEvent.WIDGET_OPENED);
                    }
                  }),
                  (t.prototype.onClose = function () {
                    var e,
                      t = this;
                    if (this.isOpen) {
                      var n = this.util,
                        o = "none";
                      if (
                        (this._ttsCancel(),
                        n.removeCSSClass(this.element, "expanded"),
                        n.addCSSClass(this.element, "collapsed"),
                        !this.settings.embedded)
                      ) {
                        n.removeCSSClass(this._botButton, o),
                          setTimeout(function () {
                            n.addCSSClass(t.chatWidgetDiv, o),
                              t._botButton.focus();
                          }, 250);
                        var i = this.getUnreadMessagesCount();
                        i > 0
                          ? this._botButton.appendChild(
                              this._botNotificationBadge
                            )
                          : (null === (e = this._botNotificationBadge) ||
                            void 0 === e
                              ? void 0
                              : e.parentElement) &&
                            this._botNotificationBadge.remove(),
                          (this._botNotificationBadge.innerText = "" + i);
                      }
                      this.isOpen = !1;
                    }
                  }),
                  (t.prototype.sendExitEvent = function () {
                    var e = this,
                      t = {
                        messagePayload: { type: k.MessageType.CloseSession },
                        userId: this.settings.userId,
                      };
                    if (
                      this.settings.delegate &&
                      this.settings.delegate.beforeEndConversation &&
                      (0, M.isFunction)(
                        this.settings.delegate.beforeEndConversation
                      )
                    )
                      try {
                        this.settings.delegate
                          .beforeEndConversation(t)
                          .then(function (t) {
                            t && e.sendMessage(t, { hidden: !0, delegate: !1 });
                          });
                      } catch (e) {
                        this._logger.error(e);
                      }
                    else this.sendMessage(t, { hidden: !0, delegate: !1 });
                  }),
                  (t.prototype.updateNotificationBadge = function (e) {
                    var t;
                    this.isOpen ||
                      (e > 0
                        ? this._botButton.appendChild(
                            this._botNotificationBadge
                          )
                        : ((null === (t = this._botNotificationBadge) ||
                          void 0 === t
                            ? void 0
                            : t.parentElement) &&
                            this._botNotificationBadge.remove(),
                          (this._unreadMessages = [])));
                  }),
                  (t.prototype.onToggleNarration = function (e) {
                    this._toggleNarration(e),
                      this._eventDispatcher.trigger(
                        C.ChatEvent.CLICK_AUDIO_RESPONSE_TOGGLE,
                        e
                      );
                  }),
                  (t.prototype.remove = function () {
                    e.prototype.remove.call(this),
                      this.settings.embedded &&
                        window.removeEventListener(
                          "resize",
                          this.resizeEventListener
                        );
                  }),
                  (t.prototype.clearConversationHistory = function () {
                    this.clearMessages(this.settings.userId),
                      this._clearChatPane(),
                      this._broadcastAction({ type: "actionClearHistory" }),
                      (this.lastMessageSenderType = null),
                      this._stopDefaultMessages();
                  }),
                  (t.prototype.clearMessages = function (e, t) {
                    var n = ""
                      .concat(this.settings.name, "-")
                      .concat(e, "-messages");
                    (t ? window[t] : this.storageService).getItem(n) &&
                      this.storageService.removeItem(n);
                  }),
                  (t.prototype.clearAllMessage = function () {
                    var e =
                        null === window || void 0 === window
                          ? void 0
                          : window.localStorage,
                      t = (null == e ? void 0 : e.length) || 0;
                    if (t)
                      for (var n = /oda-chat-.*-messages/g, o = 0; o < t; o++) {
                        var i = e.key(o);
                        (null == i ? void 0 : i.match(n)) && e.removeItem(i);
                      }
                  }),
                  (t.prototype.setUserInputMessage = function (e) {
                    this.footer.setUserInputText(e);
                  }),
                  (t.prototype.setUserInputPlaceholder = function (e) {
                    this.footer.setUserInputPlaceholder(e);
                  }),
                  (t.prototype.getWebViewComponent = function () {
                    return this.webViewComponent;
                  }),
                  (t.prototype.refreshWebView = function (e) {
                    this.webViewComponent.setProps(e),
                      this.webViewElem.remove(),
                      (this.webViewElem = this.webViewComponent.render()),
                      this.chatWidgetDiv.appendChild(this.webViewElem);
                  }),
                  (t.prototype.onMessageActionClicked = function (e) {
                    var t = this;
                    switch ((this.onSpeechToggle(!1), e.type)) {
                      case k.ActionType.Postback:
                        this._scrollToBottom(),
                          "none" !== this.settings.disablePastActions &&
                            e.messageComponent.disableActions(),
                          e.getPayload().then(function (n) {
                            var o = (0, k.buildUserMessage)({
                              postback: n,
                              text: e.label,
                              type: k.MessageType.Postback,
                            });
                            t.sendMessage(o);
                          });
                        break;
                      case k.ActionType.Location:
                        this._shareUserLocation();
                        break;
                      case k.ActionType.Share:
                        navigator.share
                          ? e.getPayload().then(function (n) {
                              navigator
                                .share({ text: n, title: e.label })
                                .then(function () {
                                  "none" !== t.settings.disablePastActions &&
                                    e.messageComponent.disableActions();
                                });
                            })
                          : this._showBanner(
                              this._localeText.shareFailureMessage
                            );
                    }
                  }),
                  (t.prototype.applyDelegates = function (e) {
                    var t,
                      n,
                      o = [
                        k.MessageType.Text,
                        k.MessageType.Location,
                        k.MessageType.Attachment,
                      ];
                    return (
                      (n =
                        "string" == typeof e
                          ? (0, k.buildUserTextMessage)(
                              e,
                              null === (t = this.speechFinalResult) ||
                                void 0 === t
                                ? void 0
                                : t.speechId
                            )
                          : (0, k.isPostbackPayload)(e)
                          ? (0, k.buildPostbackMessage)(e)
                          : (0, k.isMessagePayload)(e)
                          ? (0, k.buildUserMessage)(e)
                          : e),
                      o.indexOf(n.messagePayload.type) >= 0 &&
                      this.settings.delegate.beforeSend &&
                      (0, M.isFunction)(this.settings.delegate.beforeSend)
                        ? (n = this._executeSendDelegate(
                            n,
                            this.settings.delegate.beforeSend
                          ))
                        : n.messagePayload.type === k.MessageType.Postback &&
                          this.settings.delegate.beforePostbackSend &&
                          (0, M.isFunction)(
                            this.settings.delegate.beforePostbackSend
                          ) &&
                          (n = this._executeSendDelegate(
                            n,
                            this.settings.delegate.beforePostbackSend
                          )),
                      n
                    );
                  }),
                  (t.prototype.sendMessage = function (e, t) {
                    var n = this;
                    return (
                      this._stopDefaultMessages(),
                      !this.settings.enableSpeechAutoSend &&
                        this.speechFinalResult &&
                        "string" == typeof e &&
                        e
                          .toLowerCase()
                          .indexOf(this.speechFinalResult.text.toLowerCase()) >=
                          0 &&
                        (e = (0, k.buildUserTextMessage)(
                          e,
                          this.speechFinalResult.speechId
                        )),
                      this.footer.focusTextArea(),
                      this._ttsCancel(),
                      void 0 === (t = t || {}).delegate && (t.delegate = !0),
                      t.delegate &&
                        this.settings.delegate &&
                        (e = this.applyDelegates(e)),
                      this._core
                        .sendMessage(e, {
                          sdkMetadata: { version: c.SDK_VERSION },
                        })
                        .then(function (o) {
                          n._logger.debug("onMessageSent", e),
                            n.showTypingIndicator(),
                            n.sentMessage(o),
                            (n.isResponseReceived = !1),
                            n.enableDefaultBotResponse &&
                              n.startDefaultResponseTimer(),
                            (n.speechFinalResult = null),
                            (null == t ? void 0 : t.hidden)
                              ? (n.lastMessageSenderType = k.SenderType.User)
                              : n._onMessageSent(o);
                        })
                    );
                  }),
                  (t.prototype.uploadFile = function (e, t) {
                    var n = this;
                    this._ttsCancel(), this._onSendMessage();
                    var o = new a.default(function (o, i) {
                      var r;
                      if (n.settings.enableHeadless)
                        n._core
                          .sendAttachment(e, {
                            sdkMetadata: { version: c.SDK_VERSION },
                          })
                          .then(function (e) {
                            o(e);
                          })
                          .catch(function (e) {
                            i(e);
                          });
                      else {
                        n._scrollToBottom();
                        var a =
                            null === (r = e.name) || void 0 === r
                              ? void 0
                              : r.replace(
                                  /[\s:\'"\\/\[\]~,\.;^`()@#%\*+=$&!{}?<>|]/g,
                                  ""
                                ),
                          l = ""
                            .concat(a)
                            .concat(Math.floor(1e4 + 9e4 * Math.random()))
                            .concat(Date.now() % 1e5),
                          h = n.util.createDiv();
                        (h.id = l),
                          n._attachmentDivs.push({
                            divId: l,
                            fileName: e.name,
                          }),
                          n.setTimestampHeaderIfNewDate(new Date()),
                          n._appendMessageToConversation(h);
                        var u = t ? t.maxSize : c.ATTACHMENT_MAX_SIZE;
                        if (e.size > u) {
                          n._scrollToBottom();
                          var d = u / (c.BYTE_MULTIPLIER * c.BYTE_MULTIPLIER),
                            g = d.toString();
                          (0, p.isInteger)(d) || (g = d.toFixed(3));
                          var f = ""
                              .concat(e.name, " - ")
                              .concat(n._localeText.uploadFailed),
                            m =
                              n._localeText.uploadFileSizeLimitExceeded.replace(
                                "{0}",
                                g
                              );
                          n._displayUploadError(f, m, l),
                            n.updateRelativeTimestamp(k.SenderType.User),
                            i(new Error(m));
                        } else if (0 === e.size)
                          n._scrollToBottom(),
                            (f = ""
                              .concat(e.name, " - ")
                              .concat(n._localeText.uploadFailed)),
                            (m = n._localeText.uploadFileSizeZeroByte),
                            n._displayUploadError(f, m, l),
                            n.updateRelativeTimestamp(k.SenderType.User),
                            i(new Error(m));
                        else {
                          var v = new b.LoadingMessageComponent(
                            e.name,
                            s.MESSAGE_SIDE.RIGHT,
                            n.settings,
                            n.util
                          );
                          n.updateRelativeTimestamp(k.SenderType.User),
                            h.appendChild(v.render()),
                            n._scrollToBottom(),
                            n._core
                              .sendAttachment(e, {
                                sdkMetadata: { version: c.SDK_VERSION },
                              })
                              .then(function (t) {
                                (t.messagePayload.attachment.title = e.name),
                                  v.remove(),
                                  (n._attachmentDivs = n._attachmentDivs.filter(
                                    function (e) {
                                      return e.divId !== l;
                                    }
                                  )),
                                  (n.isFirstMessage = !1),
                                  n.sentMessage(t),
                                  n._onMessageSent(t),
                                  o(t);
                              })
                              .catch(function (t) {
                                n._handleUploadError(e.name, t.message, l),
                                  i(t);
                              });
                        }
                      }
                    });
                    return (
                      o.catch(function (e) {
                        n._logger.error(e);
                      }),
                      o
                    );
                  }),
                  (t.prototype.refreshTTS = function () {
                    this.header.showTTSButton(!!this.settings.ttsService);
                  }),
                  (t.prototype.getSuggestions = function (e) {
                    var t = this;
                    if (
                      !this.settings.enableAutocompleteClientCache ||
                      (this.settings.enableAutocompleteClientCache &&
                        !this.footer.getSuggestionsValid())
                    )
                      return this._core.getSuggestions(e).then(function (e) {
                        return (
                          t.footer.displaySuggestions(e), a.default.resolve(e)
                        );
                      });
                    var n = this._filterSuggestions(
                      this.footer.getSuggestions(),
                      e
                    );
                    return (
                      null != this.footer && this.footer.displaySuggestions(n),
                      a.default.resolve(n)
                    );
                  }),
                  (t.prototype.getUnreadMsgsCount = function () {
                    return this._unreadMessages.length;
                  }),
                  (t.prototype.getMessages = function () {
                    var e = this.storageService.getItem(this._chatStorageId);
                    return e
                      ? JSON.parse(e).map(function (e) {
                          return r({}, e);
                        })
                      : [];
                  }),
                  (t.prototype.loadChat = function () {
                    var e = this.getMessages();
                    e.length &&
                      (this._updateUnreadMessages(),
                      this.storageService.setItem(
                        this._chatStorageId,
                        JSON.stringify(e)
                      ));
                  }),
                  (t.prototype._saveMessage = function (e) {
                    var t = this.getMessages();
                    t.length >= this.settings.messageCacheSizeLimit &&
                      t.splice(
                        0,
                        t.length - (this.settings.messageCacheSizeLimit - 1)
                      );
                    var n = JSON.stringify(e).substring(
                      1,
                      JSON.stringify(e).length - 1
                    );
                    (n = "{".concat(n, ', "date":"').concat(new Date(), '"}')),
                      t.push(JSON.parse(n)),
                      this.storageService.setItem(
                        this._chatStorageId,
                        JSON.stringify(t)
                      );
                  }),
                  (t.prototype._configureStorage = function () {
                    var e = this.settings;
                    e.userId
                      ? e.storageType !== v.StorageType.LOCAL &&
                        e.storageType !== v.StorageType.SESSION &&
                        (e.storageType = v.StorageType.LOCAL)
                      : (e.storageType = v.StorageType.SESSION),
                      (this._chatStorageId = ""
                        .concat(e.name, "-")
                        .concat(e.userId, "-messages")),
                      (this.storageService = new L.StorageService(
                        e.storageType
                      ));
                  }),
                  (t.prototype.setVoiceRecognitionService = function (e) {
                    this.footer.disableVoiceModeButton(!e, { src: "lang" });
                  }),
                  (t.prototype.enableSpeechSynthesisService = function (e) {
                    this.header.disableTTSButton(!e);
                  }),
                  (t.prototype.onShareLocation = function () {
                    this._shareUserLocation();
                  }),
                  (t.prototype.setPrimaryChatLanguage = function (e) {
                    this.multiLangChat.setTag(e);
                  }),
                  (t.prototype.onLanguageUpdate = function (e, t) {
                    void 0 === t && (t = !0);
                    var n = this.settings.i18n,
                      o = r(r(r({}, n.en), n[this.settings.locale]), n[e]);
                    t &&
                      this._broadcastAction({ type: "actionLanguage", tag: e }),
                      (this.currentLocale = e),
                      (this._botButton.title = o.chatTitle),
                      this.header.setLocale(o),
                      this.footer.setLocale(o),
                      this.webViewComponent.setProps({
                        accessibilityTitle: o.webViewAccessibilityTitle,
                        closeButtonLabel: o.webViewClose,
                        errorInfoDismissLabel: o.webViewErrorInfoDismiss,
                        errorInfoText: o.webViewErrorInfoText,
                      }),
                      this.multiLangChat && this.multiLangChat.setLocale(o),
                      this.relativeTimestamp &&
                        this.relativeTimestamp.setLocale(o),
                      (this._localeText = o);
                  }),
                  (t.prototype.on = function (e, t) {
                    this.observer.bind(e, t);
                  }),
                  (t.prototype.off = function (e, t) {
                    this.observer.unbind(e, t);
                  }),
                  (t.prototype.showTypingIndicator = function () {
                    this.settings.showTypingIndicator &&
                      (this.typingIndicator.append(this._conversationContainer),
                      this._scrollToBottom());
                  }),
                  (t.prototype.showEndConversationPrompt = function () {
                    (0, x.addChild)(
                      this.chatPane.element,
                      this.endConversationPrompt
                    );
                  }),
                  (t.prototype.updateDefaultResponse = function (e) {
                    if (
                      ((this.isFirstMessage = !1), !this.isResponseReceived)
                    ) {
                      var t = {
                        source: k.SkillMessageSource.Bot,
                        messagePayload: { type: k.MessageType.Text, text: e },
                        userId: this.settings.userId,
                        msgId: "".concat(Date.now()),
                      };
                      this._saveMessage(t),
                        this._renderMessagesAndScroll([t], {});
                    }
                  }),
                  (t.prototype.startDefaultResponseTimer = function () {
                    var e = this;
                    this.defaultResponseTimer = window.setTimeout(function () {
                      e.isFirstMessage &&
                        e.updateDefaultResponse(
                          e._localeText.defaultGreetingMessage
                        ),
                        (e.defaultResponseInterval = window.setInterval(
                          function () {
                            e.updateDefaultResponse(
                              e._localeText.defaultWaitMessage
                            );
                          },
                          1e3 * e.settings.defaultWaitMessageInterval
                        )),
                        (e.waitMessageClearTimer = window.setTimeout(
                          function () {
                            window.clearInterval(e.defaultResponseInterval);
                          },
                          1e3 * (e.settings.typingIndicatorTimeout - 1)
                        )),
                        (e.defaultResponseTimer = window.setTimeout(
                          function () {
                            e._hideTypingIndicator(),
                              e.updateDefaultResponse(
                                e._localeText.defaultSorryMessage
                              );
                          },
                          1e3 * e.settings.typingIndicatorTimeout
                        ));
                    }, 1e3 * this.settings.defaultGreetingTimeout);
                  }),
                  (t.prototype.endConversation = function () {
                    this.sendExitEvent(), this.closePrompt();
                  }),
                  (t.prototype.closePrompt = function () {
                    this.endConversationPrompt
                      .querySelector(
                        ".".concat(
                          this.cssPrefix,
                          "-prompt-banner-close-button"
                        )
                      )
                      .click();
                  }),
                  (t.prototype._hideTypingIndicator = function () {
                    this.settings.showTypingIndicator &&
                      this.typingIndicator.remove();
                  }),
                  (t.prototype._onChatServerStatusChange = function (e) {
                    if (
                      (this._isFirstConnect &&
                        (this._loadPreviousConversations(),
                        (this._isFirstConnect = !1)),
                      Number.isInteger(e) && e !== k.ConnectionState.Open)
                    ) {
                      this._stopBroadcaster(),
                        this.footer.isDisabled() ||
                          (this.footer.disable(),
                          this.header.disable(),
                          this._logger.debug(
                            "WebSocket not open, send message button disabled"
                          )),
                        this._onDisconnection(),
                        this._hideTypingIndicator();
                      for (
                        var t = 0, n = this._attachmentDivs;
                        t < n.length;
                        t++
                      ) {
                        var o = n[t];
                        this._handleUploadError(
                          o.fileName,
                          k.CoreError.UploadNetworkFail,
                          o.divId
                        );
                      }
                    } else
                      this._initBroadcaster(),
                        this.footer.isDisabled() &&
                          (this.footer.disable(!1),
                          this.header.disable(!1),
                          this._logger.debug(
                            "Connection established, send message button enabled"
                          )),
                        this._onConnection();
                    this.onConnectionStatusChange(e);
                  }),
                  (t.prototype._initMultiLangChat = function () {
                    var e = this.settings;
                    (this.multiLangChat = new I.MultiLangChatComponent(
                      e.multiLangChat,
                      {
                        webCore: this._core,
                        chatWidget: this,
                        eventDispatcher: this._eventDispatcher,
                        settings: e,
                        synthesisVoices: e.skillVoices,
                        storageService: new L.StorageService(e.storageType),
                        util: this.util,
                      }
                    )),
                      e.multiLangChat &&
                        this.header.addLanguageSelect(this.multiLangChat);
                  }),
                  (t.prototype._shareUserLocation = function () {
                    var e = this;
                    if ((0, S.isLocationServiceAvailable)()) {
                      var t = new b.LoadingMessageComponent(
                        this._localeText.requestLocation,
                        s.MESSAGE_SIDE.RIGHT,
                        this.settings,
                        this.util
                      );
                      this._appendMessageToConversation(t.render()),
                        this._scrollToBottom(),
                        (0, S.getCurrentLocation)().then(
                          function (n) {
                            var o = n.coords,
                              i = (0, k.buildUserMessage)({
                                location: {
                                  latitude: o.latitude,
                                  longitude: o.longitude,
                                  title: void 0,
                                },
                                type: k.MessageType.Location,
                              });
                            t.remove(), e.sendMessage(i);
                          },
                          function (n) {
                            var o;
                            switch (n.code) {
                              case n.PERMISSION_DENIED:
                                o =
                                  e._localeText.requestLocationDeniedPermission;
                                break;
                              case n.POSITION_UNAVAILABLE:
                                o =
                                  e._localeText
                                    .requestLocationDeniedUnavailable;
                                break;
                              case n.TIMEOUT:
                                o = e._localeText.requestLocationDeniedTimeout;
                                break;
                              default:
                                o =
                                  e._localeText.requestLocationDeniedPermission;
                            }
                            e._showBanner(o), t.remove();
                          }
                        );
                    } else
                      this._showBanner(
                        this._localeText.requestLocationDeniedUnavailable
                      );
                  }),
                  (t.prototype._filterSuggestions = function (e, t) {
                    for (var n = [], o = 0, i = e; o < i.length; o++) {
                      var r = i[o];
                      -1 !== r.search(new RegExp(t, "i")) && n.push(r);
                    }
                    return n;
                  }),
                  (t.prototype._handleUploadError = function (e, t, n) {
                    var o = e + " - " + this._localeText.uploadFailed,
                      i = "";
                    switch (t) {
                      case k.CoreError.UploadMaxSize:
                        i =
                          this._localeText.uploadFileSizeLimitExceeded.replace(
                            "{0}",
                            "25"
                          );
                        break;
                      case k.CoreError.UploadZeroSize:
                        i = this._localeText.uploadFileSizeZeroByte;
                        break;
                      case k.CoreError.UploadBadFile:
                        i = this._localeText.uploadUnsupportedFileType;
                    }
                    this._displayUploadError(o, i, n);
                  }),
                  (t.prototype._executeSendDelegate = function (e, t) {
                    var n,
                      o,
                      i = JSON.parse(JSON.stringify(e)),
                      r = JSON.parse(JSON.stringify(e));
                    e.messagePayload.type === k.MessageType.Text &&
                      (null === (n = e.sdkMetadata) || void 0 === n
                        ? void 0
                        : n.speechId) &&
                      (o = (e.messagePayload.text || "").toLowerCase());
                    try {
                      r = t(i);
                    } catch (e) {
                      this._logger.error(e);
                    }
                    if (
                      ((r && r.messagePayload) || (r = null),
                      r &&
                        !(0, k.isValidMessage)(r) &&
                        (this._logger.error(
                          "The generated delegate message is invalid. Sending original message instead."
                        ),
                        (r = e)),
                      o && r)
                    )
                      if (r.messagePayload)
                        if (r.messagePayload.type === k.MessageType.Text) {
                          var a = r.messagePayload.text;
                          (null == a ? void 0 : a.toLowerCase().indexOf(o)) <
                            0 && delete r.sdkMetadata;
                        } else delete r.sdkMetadata;
                      else delete r.sdkMetadata;
                    return r;
                  }),
                  (t.prototype._displayUploadError = function (e, t, n) {
                    var o = new w.MessageStringComponent(
                        e,
                        t,
                        s.MESSAGE_SIDE.RIGHT,
                        this.settings,
                        this.util,
                        !0
                      ),
                      i = document.getElementById(n);
                    i.firstElementChild && i.removeChild(i.firstElementChild),
                      (this._attachmentDivs = this._attachmentDivs.filter(
                        function (e) {
                          return e.divId !== n;
                        }
                      ));
                    var r = this.settings.icons.error || l.iconError;
                    i.appendChild(o.render(r));
                  }),
                  (t.prototype._makeButtonDraggable = function (e, t) {
                    var n,
                      o,
                      i = this,
                      r = this.util,
                      a = !1,
                      s = !1,
                      c = 0,
                      l = 0,
                      p = 0,
                      h = 0,
                      u = 0,
                      d = 0,
                      g = function (e) {
                        for (
                          var t, n, o = e.target.classList, i = 0;
                          i < o.length;
                          i++
                        )
                          o[i].indexOf("button-drag-handle") &&
                            ("touchstart" === e.type
                              ? ((t = e.touches[0].clientX),
                                (n = e.touches[0].clientY))
                              : ((t = e.clientX), (n = e.clientY)),
                            (c = t - p),
                            (l = n - h),
                            (u = t),
                            (d = n),
                            (a = !0));
                      },
                      f = function (i) {
                        var g, f;
                        if (a) {
                          "touchmove" === i.type
                            ? ((g = i.touches[0].clientX),
                              (f = i.touches[0].clientY))
                            : ((g = i.clientX), (f = i.clientY));
                          var m = g - u,
                            v = f - d;
                          (p = n = g - c),
                            (h = o = f - l),
                            (m >= 5 || v >= 5 || m <= -5 || v <= -5) &&
                              (r.addCSSClass(e, "drag"),
                              (t.style.transform =
                                "translate3d(" + n + "px, " + o + "px, 0)"),
                              (t.onclick = null),
                              (s = !0));
                        }
                      },
                      m = function () {
                        s &&
                          (setTimeout(function () {
                            t.onclick = i.openChat.bind(i);
                          }, 10),
                          t.focus(),
                          (s = !1)),
                          (a = !1);
                      },
                      v = r.createDiv(["button-drag-handle"]);
                    t.appendChild(v),
                      t.addEventListener("touchstart", g),
                      document.addEventListener("touchmove", f),
                      t.addEventListener("touchend", m),
                      t.addEventListener("mousedown", g),
                      document.addEventListener("mousemove", f),
                      t.addEventListener("mouseup", m);
                  }),
                  (t.prototype._createElement = function () {
                    var e,
                      t,
                      n,
                      o,
                      i,
                      r = this,
                      a = this.settings,
                      s = this.util,
                      c = s.createDiv(a.embedded ? [] : ["wrapper", a.theme]);
                    (this.chatWidgetDiv = s.createDiv([
                      "widget",
                      "flex",
                      "col",
                    ])),
                      this.chatWidgetDiv.setAttribute("role", "region"),
                      this.chatWidgetDiv.setAttribute(
                        "aria-labelledby",
                        "".concat(this.cssPrefix, "-title")
                      ),
                      (this.header = new u.ChatHeaderComponent(
                        a,
                        s,
                        this.closeChat.bind(this),
                        this.clearConversationHistory.bind(this),
                        this.onToggleNarration.bind(this),
                        this._core,
                        this.showEndConversationPrompt.bind(this)
                      )),
                      this.chatWidgetDiv.appendChild(this.header.element),
                      a.embedTopStickyId &&
                        this.addCustomBanner(
                          a.embedTopStickyId,
                          this.chatWidgetDiv,
                          ["embed-sticky-top"]
                        ),
                      (this.chatPane = new d.WidgetMainComponent(s)),
                      this.chatPane.element.addEventListener(
                        "scroll",
                        this._updateUnreadMessages.bind(this)
                      ),
                      (this._scrollContent = s.createDiv([
                        "conversation-pane",
                        this.settings.icons.avatarBot ? "bot-icon" : "",
                        this.settings.icons.avatarUser ? "user-icon" : "",
                      ])),
                      "top" === a.conversationBeginPosition &&
                        (this._scrollContent.style.flex = "auto"),
                      a.embedTopScrollId &&
                        this.addCustomBanner(
                          a.embedTopScrollId,
                          this._scrollContent,
                          ["embed-scroll-top"]
                        ),
                      (this._conversationContainer = s.createDiv([
                        "conversation-container",
                      ])),
                      this._conversationContainer.setAttribute("role", "log"),
                      this._conversationContainer.setAttribute(
                        "aria-live",
                        "polite"
                      ),
                      this._conversationContainer.setAttribute(
                        "aria-atomic",
                        "false"
                      ),
                      this._scrollContent.appendChild(
                        this._conversationContainer
                      ),
                      this.chatPane.element.appendChild(this._scrollContent),
                      a.embedBottomScrollId &&
                        this.addCustomBanner(
                          a.embedBottomScrollId,
                          this.chatPane.element,
                          ["embed-scroll-bottom"]
                        ),
                      this.chatWidgetDiv.appendChild(this.chatPane.element),
                      a.embedBottomStickyId &&
                        this.addCustomBanner(
                          a.embedBottomStickyId,
                          this.chatWidgetDiv,
                          ["embed-sticky-bottom"]
                        ),
                      (this.footer = new h.ChatFooterComponent(
                        s,
                        this.sendMessage.bind(this),
                        this.uploadFile.bind(this),
                        a,
                        this.getSuggestions.bind(this),
                        this.onSpeechToggle.bind(this),
                        this._shareUserLocation.bind(this),
                        this._eventDispatcher,
                        this
                      )),
                      this.chatWidgetDiv.appendChild(this.footer.element),
                      (e = a.webViewConfig).accessibilityTitle ||
                        (e.accessibilityTitle =
                          this._localeText.webViewAccessibilityTitle),
                      (t = a.webViewConfig).closeButtonLabel ||
                        (t.closeButtonLabel = this._localeText.webViewClose),
                      (n = a.webViewConfig).errorInfoDismissLabel ||
                        (n.errorInfoDismissLabel =
                          this._localeText.webViewErrorInfoDismiss),
                      (o = a.webViewConfig).errorInfoText ||
                        (o.errorInfoText =
                          this._localeText.webViewErrorInfoText),
                      (i = a.webViewConfig).closeButtonIcon ||
                        (i.closeButtonIcon = a.icons.close),
                      (this.webViewComponent = new T.default(
                        a.webViewConfig,
                        s,
                        a
                      )),
                      (this.webViewElem = this.webViewComponent.render()),
                      this.chatWidgetDiv.appendChild(this.webViewElem);
                    var p = this,
                      g = "".concat(this.cssPrefix, "-webview");
                    if (
                      ((this.webviewLinkHandler = {
                        target: g,
                        onclick: function () {
                          p.webViewComponent.open(this.href);
                        },
                      }),
                      a.linkHandler &&
                        a.linkHandler.target === g &&
                        (a.linkHandler = this.webviewLinkHandler),
                      c.appendChild(this.chatWidgetDiv),
                      a.embedded)
                    )
                      (this.isOpen = !0), s.addCSSClass(c, "open");
                    else {
                      var f =
                          a.icons.launch ||
                          (a.colors && a.colors.branding
                            ? l.iconLaunchButton.replace(
                                "#025e7e",
                                a.colors.branding
                              )
                            : l.iconLaunchButton),
                        m = "button",
                        v = s.createIconButton({
                          css: [m],
                          icon: f,
                          iconCss: ["".concat(m, "-icon")],
                          title: this._localeText.chatTitle,
                        });
                      v.classList.remove("".concat(this.cssPrefix, "-icon")),
                        (this._botButton = v),
                        (this._botButton.onclick = this.openChat.bind(this)),
                        (this._botNotificationBadge = s.createDiv([
                          "notification-badge",
                        ])),
                        c.appendChild(v);
                      var b = "none";
                      a.openChatOnLoad
                        ? (s.addCSSClass(c, "expanded"),
                          s.addCSSClass(v, b),
                          setTimeout(function () {
                            return r.footer.focusTextArea();
                          }))
                        : (s.addCSSClass(c, "collapsed"),
                          s.addCSSClass(this.chatWidgetDiv, b)),
                        a.enableDraggableButton &&
                          this._makeButtonDraggable(c, v);
                    }
                    return c;
                  }),
                  (t.prototype._appendMessageToConversation = function (e) {
                    var t;
                    this._conversationContainer.appendChild(e),
                      (null === (t = this.typingIndicator) || void 0 === t
                        ? void 0
                        : t.isVisible()) &&
                        (this._hideTypingIndicator(),
                        this.showTypingIndicator());
                  }),
                  (t.prototype._scrollToBottom = function () {
                    var e = this.chatPane.element;
                    setTimeout(function () {
                      e && (e.scrollTop = e.scrollHeight);
                    }, c.Constants.CHAT_SCROLL_DELAY);
                  }),
                  (t.prototype._renderMessagesAndScroll = function (e, t) {
                    var n = this,
                      o = t.attachmentDivId;
                    return (null == e ? void 0 : e.length)
                      ? new a.default(function (t) {
                          n.settings.clientAuthEnabled &&
                          n.settings.enableAttachmentSecurity
                            ? n._core
                                .getAuthToken()
                                .then(function (i) {
                                  n._renderMessages(e, {
                                    attachmentDivId: o,
                                    authToken: i.token,
                                  }),
                                    t(),
                                    n._scrollToBottom();
                                })
                                .catch(function () {
                                  n._renderMessages(e, { attachmentDivId: o }),
                                    t(),
                                    n._scrollToBottom();
                                })
                            : (n._renderMessages(e, { attachmentDivId: o }),
                              t(),
                              n._scrollToBottom());
                        })
                      : (this._renderMessages(e, {}), a.default.resolve());
                  }),
                  (t.prototype.getAvatar = function (e) {
                    var t = this.util,
                      n = t.createDiv(["icon-wrapper"]),
                      o = t.createImageIcon({
                        icon: e,
                        iconCss: ["message-icon"],
                        title: "",
                      });
                    return n.appendChild(o), n;
                  }),
                  (t.prototype.getTime = function (e, t) {
                    void 0 === e && (e = !1);
                    var n,
                      o = new Date(),
                      i = (0, M.formatDate)(o, {
                        pattern: this.settings.timestampFormat,
                        locale: this.settings.locale,
                      }),
                      r = e ? this.settings.readMark : "",
                      a = ["message-date"];
                    return (
                      t &&
                        a.push("has-icon-".concat(1 === t ? "left" : "right")),
                      (n = this.util.createDiv(a)).setAttribute(
                        "aria-live",
                        "off"
                      ),
                      n.setAttribute("aria-hidden", "true"),
                      (n.innerText = "".concat(i, " ").concat(r)),
                      n
                    );
                  }),
                  (t.prototype._renderMessages = function (e, t) {
                    var n = this,
                      o = t.attachmentDivId,
                      i = t.authToken,
                      r = this.util,
                      a = {
                        locale: this.currentLocale,
                        webviewLinkHandler: this.webviewLinkHandler,
                      };
                    (null == i ? void 0 : i.length) &&
                      ((a.authToken = i), (a.uri = this.settings.URI)),
                      e.forEach(function (e) {
                        var t,
                          i = Date.now(),
                          s = (0, E.isBotMessage)(e)
                            ? k.SenderType.Skill
                            : k.SenderType.User,
                          l =
                            n.lastMessageSenderType === s &&
                            i - n.lastMessageTime < c.MESSAGE_BLOCK_THRESOLD;
                        if (
                          ((n.lastMessageSenderType = s),
                          (n.lastMessageTime = i),
                          l ||
                            ((t = r.createDiv(["message-block", "flex"])),
                            (n.lastMessageBlock = t)),
                          (0, E.isBotMessage)(e))
                        ) {
                          var h = (0, E.getMessageDigest)(e);
                          if (n.messageIDs.indexOf(h) >= 0) return;
                          n.messageIDs.push(h);
                        }
                        var u = f.MessageComponentFactory.fromMessage(
                          n.settings,
                          n.util,
                          e,
                          n._markAsRead.bind(n),
                          a
                        );
                        if (
                          ((u.onActionClick = n.onMessageActionClicked.bind(n)),
                          (0, p.isFeedbackComponent)(u) &&
                            (n.pendingFeedback = u),
                          (0, E.isBotMessage)(e))
                        )
                          n._isNewMessage
                            ? n._onReceiveMessage(u)
                            : n._skillMessages.push(u);
                        else if (n.pendingFeedback) {
                          var d = e;
                          if (
                            d.messagePayload.type === k.MessageType.Text ||
                            d.messagePayload.type === k.MessageType.Postback
                          ) {
                            var g = d.messagePayload;
                            n.pendingFeedback.highlightRating(g.text);
                          }
                          n.pendingFeedback = null;
                        }
                        if (o) {
                          var m = document.getElementById(o);
                          m.removeChild(m.firstElementChild),
                            m.appendChild(u.render()),
                            (n._attachmentDivs = n._attachmentDivs.filter(
                              function (e) {
                                return e.divId !== o;
                              }
                            ));
                        } else {
                          if (
                            (n.setTimestampHeaderIfNewDate(
                              e.date || new Date()
                            ),
                            t)
                          ) {
                            var v = n.settings.icons,
                              b = void 0;
                            (0, E.isBotMessage)(e)
                              ? ((b =
                                  (e.source === k.SkillMessageSource.Agent &&
                                    v.avatarAgent) ||
                                  v.avatarBot),
                                r.addCSSClass(t, "left"),
                                b && t.appendChild(n.getAvatar(b)))
                              : (r.addCSSClass(t, "right"),
                                v.avatarUser &&
                                  t.appendChild(n.getAvatar(v.avatarUser)));
                            var w = r.createDiv([
                                "messages-wrapper",
                                "flex",
                                "col",
                              ]),
                              y = r.createDiv(["message-list", "flex", "col"]);
                            if (
                              (w.appendChild(y),
                              n.settings.enableTimestamp &&
                                "absolute" === n.settings.timestampMode)
                            ) {
                              var C = n.getTime(!1, 0);
                              w.appendChild(C);
                            }
                            t.appendChild(w);
                          }
                          var x = u.render();
                          n.lastMessageBlock
                            .querySelector('[class*="message-list"]')
                            .appendChild(x),
                            t && n._appendMessageToConversation(t),
                            n.updateRelativeTimestamp(s);
                          var _ = { component: u, element: x };
                          n._markMessageAsReadIfVisible(_) ||
                            n._unreadMessages.push(_),
                            (0, E.isBotMessage)(e) &&
                              n.focusMessageFirstAction(u);
                        }
                      }),
                      this.settings.embedded ||
                        this.isOpen ||
                        setTimeout(function () {
                          var e = n.getUnreadMessagesCount();
                          e > 0 &&
                            ((n._botNotificationBadge.innerText = "" + e),
                            n._botButton.appendChild(n._botNotificationBadge));
                        });
                  }),
                  (t.prototype.setTimestampHeaderIfNewDate = function (e) {
                    (0, M.isSameDay)(this.currTimestampHeader, e) ||
                      ((this.currTimestampHeader = new Date(e)),
                      this._appendMessageToConversation(
                        this.createTimestampHeader(this.currTimestampHeader)
                      ));
                  }),
                  (t.prototype.createTimestampHeader = function (e) {
                    var t = this.util.createDiv(["timestamp-header"]);
                    return (
                      (t.textContent = (0, M.formatDate)(e, {
                        pattern: this.settings.timestampFormat,
                        locale: this.currentLocale || this.settings.locale,
                      })),
                      t
                    );
                  }),
                  (t.prototype.updateRelativeTimestamp = function (e) {
                    this.relativeTimestampElement ||
                      (this.relativeTimestampElement =
                        this.relativeTimestamp.render()),
                      this.relativeTimestampElement.remove(),
                      this.relativeTimestamp.refresh(e),
                      this._appendMessageToConversation(
                        this.relativeTimestampElement
                      );
                  }),
                  (t.prototype.focusMessageFirstAction = function (e) {
                    e.hasActions() &&
                      setTimeout(function () {
                        e.focusFirstAction();
                      }, 290);
                  }),
                  (t.prototype.addCustomBanner = function (e, t, n) {
                    var o = document.querySelector("#".concat(e));
                    if (o) {
                      var i = this.util.createDiv(n);
                      i.appendChild(o), t.appendChild(i);
                    } else
                      this._logger.error(
                        "Could not find element with ID '".concat(
                          e,
                          "'. No element embedded to the chat conversation pane."
                        )
                      );
                  }),
                  (t.prototype.onSpeechToggle = function (e) {
                    var t = this,
                      n = (0, p.getColor)("--color-visualizer");
                    this._ttsCancel(),
                      this._eventDispatcher.trigger(
                        C.ChatEvent.CLICK_VOICE_TOGGLE,
                        e
                      ),
                      this.settings.enableSpeech &&
                        (e
                          ? (this._hideBanner(),
                            this.settings.speechLocale &&
                            !(0, k.isValidLocale)(this.settings.speechLocale)
                              ? this._showBanner(
                                  this._localeText.errorSpeechUnsupportedLocale
                                )
                              : this._core
                                  .startRecognition({
                                    onRecognitionText:
                                      this.onSpeechRecognition.bind(this),
                                    onVisualData: function (e) {
                                      t.footer.updateVisualizer(e, n);
                                    },
                                  })
                                  .then(function () {
                                    t.footer.setVoiceRecording(!0),
                                      t._scrollToBottom();
                                  })
                                  .catch(function (e) {
                                    t.footer.setVoiceRecording(!1);
                                    var n = "";
                                    switch (e.message) {
                                      case k
                                        .CoreError.RecognitionMultipleConnection:
                                        n =
                                          t._localeText
                                            .errorSpeechMultipleConnection;
                                        break;
                                      case k.CoreError.RecognitionNotReady:
                                        n = t._localeText.errorSpeechInvalidUrl;
                                        break;
                                      case k
                                        .CoreError.RecognitionProcessingFailure:
                                        n =
                                          t._localeText
                                            .errorSpeechTooMuchTimeout;
                                        break;
                                      default:
                                        n =
                                          t._localeText.errorSpeechUnavailable;
                                    }
                                    t._showBanner(n);
                                  }))
                          : (this._core.stopRecognition(),
                            this.footer.setVoiceRecording(!1)));
                  }),
                  (t.prototype.onSpeechRecognition = function (e) {
                    var t = this;
                    if (e)
                      switch (e.type) {
                        case "error":
                          this._logger.error(
                            "Failed to recognize voice",
                            e.text
                          ),
                            e.text ===
                              k.CoreError.RecognitionTooMuchSpeechTimeout &&
                              this._showBanner(
                                this._localeText.errorSpeechTooMuchTimeout
                              ),
                            this.footer.setVoiceRecording(!1);
                          break;
                        case "final":
                          var n = e.text;
                          n.length > 0
                            ? (this.speechFinalResult &&
                                (n = ""
                                  .concat(this.speechFinalResult.text, " ")
                                  .concat(n)),
                              this.footer.setUserInputText(n),
                              this.settings.enableSpeechAutoSend
                                ? setTimeout(function () {
                                    var o = (0, k.buildUserTextMessage)(
                                      n,
                                      e.requestId
                                    );
                                    t.sendMessage(o).then(function () {
                                      t.footer.setUserInputText("");
                                    });
                                  }, this.FINAL_RESULT_DISPLAY_TIMEOUT)
                                : (this.speechFinalResult = {
                                    speechId: e.requestId,
                                    text: n,
                                  }),
                              this.footer.setVoiceRecording(!1))
                            : this.footer.setUserInputText(
                                this.speechFinalResult.text
                              );
                          break;
                        case "partial":
                          var o = e.text;
                          o.length > 0 &&
                            (this.speechFinalResult &&
                              (o = ""
                                .concat(this.speechFinalResult.text, " ")
                                .concat(o)),
                            this.footer.setUserInputText(o));
                      }
                  }),
                  (t.prototype._onLoadPreviousMessages = function () {
                    var e = this.settings.disablePastActions,
                      t = this._skillMessages;
                    "all" === e
                      ? t.forEach(function (e) {
                          return e.disableActions();
                        })
                      : t.forEach(function (e) {
                          return e.disablePostbacks();
                        });
                  }),
                  (t.prototype._onReceiveMessage = function (e) {
                    ("none" === this.settings.disablePastActions
                      ? this._skillMessages
                      : this._latestSkillMessages
                    ).push(e);
                  }),
                  (t.prototype._onSendMessage = function () {
                    switch (this.settings.disablePastActions) {
                      case "all":
                        this._latestSkillMessages.forEach(function (e) {
                          return e.disableActions();
                        });
                        break;
                      case "postback":
                        this._latestSkillMessages.forEach(function (e) {
                          return e.disablePostbacks();
                        });
                    }
                    this._latestSkillMessages = [];
                  }),
                  (t.prototype._onConnection = function () {
                    ("none" === this.settings.disablePastActions
                      ? this._skillMessages
                      : this._latestSkillMessages
                    ).forEach(function (e) {
                      return e.enablePostbacks();
                    });
                  }),
                  (t.prototype._onDisconnection = function () {
                    ("none" === this.settings.disablePastActions
                      ? this._skillMessages
                      : this._latestSkillMessages
                    ).forEach(function (e) {
                      return e.disablePostbacks();
                    });
                  }),
                  (t.prototype._markAsRead = function (e) {}),
                  (t.prototype._clearChatPane = function () {
                    var e,
                      t = !1;
                    for (
                      (null === (e = this.typingIndicator) || void 0 === e
                        ? void 0
                        : e.isVisible()) &&
                      ((t = !0), this._hideTypingIndicator());
                      this._conversationContainer.firstChild;

                    )
                      this._conversationContainer.removeChild(
                        this._conversationContainer.lastChild
                      );
                    t && this.showTypingIndicator(),
                      this._renderMessagesAndScroll([], {}),
                      (this.isFirstMessage = !0),
                      (this.currTimestampHeader = null),
                      this._ttsCancel(),
                      this._eventDispatcher.trigger(C.ChatEvent.CLICK_ERASE);
                  }),
                  (t.prototype._initBroadcaster = function () {
                    var e = this.settings,
                      t = e.userId,
                      n = e.channelId;
                    O &&
                      ((this.broadcaster = new O("".concat(t, "-").concat(n))),
                      (this.broadcaster.onmessage =
                        this._onBroadcastMessage.bind(this)));
                  }),
                  (t.prototype._stopBroadcaster = function () {
                    this.broadcaster &&
                      (this.broadcaster.close(), (this.broadcaster = null));
                  }),
                  (t.prototype._broadcast = function (e) {
                    if (this.broadcaster) {
                      var t = { type: "message", message: e };
                      if ((0, E.isBotMessage)(e)) {
                        var n = (0, E.getMessageDigest)(e);
                        if (this.messageIDs.indexOf(n) >= 0) return;
                        t.digest = n;
                      }
                      this.broadcaster.postMessage(t);
                    }
                  }),
                  (t.prototype._broadcastAction = function (e) {
                    this.broadcaster && this.broadcaster.postMessage(e);
                  }),
                  (t.prototype._onBroadcastMessage = function (e) {
                    var t = e.data;
                    switch (t.type) {
                      case "message":
                        if (
                          t.message.messagePayload.type ===
                          k.MessageType.SessionClosed
                        )
                          return void this.handleSessionEnd();
                        if (t.digest) {
                          if (this.messageIDs.indexOf(t.digest) >= 0) return;
                          this.receiveMessage(t.message);
                        } else
                          this.sentMessage(t.message),
                            this._onSendMessage(),
                            this.showTypingIndicator();
                        this._hideTypingIndicator(),
                          this._renderMessagesAndScroll([t.message], {});
                        break;
                      case "actionClearHistory":
                        this._clearChatPane();
                        break;
                      case "actionLanguage":
                        this.multiLangChat.setTag(t.tag, !1);
                    }
                  }),
                  (t.prototype._showBanner = function (e) {
                    (0, x.addChild)(
                      this.chatPane.element,
                      this.util.getBanner({
                        icon: l.iconWarn,
                        text: e,
                        closeText: this._localeText.webViewErrorInfoDismiss,
                        closeIcon: this.settings.icons.close,
                        autoClose: !0,
                      })
                    );
                  }),
                  (t.prototype._hideBanner = function () {
                    document
                      .querySelectorAll(
                        ".".concat(
                          this.cssPrefix,
                          "-prompt-banner-close-button"
                        )
                      )
                      .forEach(function (e) {
                        return e.click();
                      });
                  }),
                  (t.prototype._stopDefaultMessages = function () {
                    window.clearTimeout(this.defaultResponseTimer),
                      window.clearInterval(this.defaultResponseInterval),
                      window.clearTimeout(this.waitMessageClearTimer),
                      this._hideTypingIndicator();
                  }),
                  (t.prototype._onMessageReceived = function (e, t) {
                    if (
                      (this._logger.debug("onMessageReceived", e),
                      this._stopDefaultMessages(),
                      this._scrollToBottom(),
                      (this.isResponseReceived = !0),
                      (this.isFirstMessage = !1),
                      this.settings.enableDefaultClientResponse &&
                        (e.source === k.SkillMessageSource.Agent
                          ? (this.enableDefaultBotResponse = !1)
                          : this.enableDefaultBotResponse ||
                            (this.enableDefaultBotResponse = !0)),
                      e)
                    ) {
                      if (
                        this.settings.delegate &&
                        this.settings.delegate.beforeDisplay &&
                        (0, M.isFunction)(this.settings.delegate.beforeDisplay)
                      )
                        try {
                          e = this.settings.delegate.beforeDisplay(e);
                        } catch (e) {
                          this._logger.error(e);
                        }
                      this.receiveMessage(e),
                        this._broadcast(e),
                        e.messagePayload.type === k.MessageType.SessionClosed
                          ? this.handleSessionEnd()
                          : (this._renderMessagesAndScroll([e], {
                              attachmentDivId: t,
                            }),
                            this.isTTSMute ||
                              this._core.speakTTS(e, this._localeText),
                            this._saveMessage(e),
                            this._updateUnreadMessages());
                    }
                  }),
                  (t.prototype._onMessageSent = function (e, t) {
                    this._saveMessage(e),
                      this._scrollToBottom(),
                      e &&
                        (this._broadcast(e),
                        e.messagePayload &&
                          [
                            k.MessageType.Suggest,
                            k.MessageType.SessionClosed,
                            k.MessageType.CloseSession,
                          ].indexOf(e.messagePayload.type) < 0 &&
                          (this._renderMessagesAndScroll([e], {
                            attachmentDivId: t,
                          }),
                          this._updateUnreadMessages()));
                  }),
                  (t.prototype._toggleNarration = function (e) {
                    e || this._ttsCancel(), (this.isTTSMute = !e);
                  }),
                  (t.prototype._updateUnreadMessages = function () {
                    var e = this;
                    if (this.isOpen) {
                      var t = [];
                      this._unreadMessages.forEach(function (n) {
                        e._markMessageAsReadIfVisible(n) || t.push(n);
                      }),
                        (this._unreadMessages = t);
                    }
                  }),
                  (t.prototype._markMessageAsReadIfVisible = function (e) {
                    var t = !1;
                    return (
                      this.isOpen &&
                        (0, x.isElemVisible)(
                          this.chatPane.element,
                          e.element
                        ) &&
                        (e.component.updateMarkAsRead(), (t = !0)),
                      t
                    );
                  }),
                  (t.prototype._loadPreviousConversations = function () {
                    var e = this;
                    if (this.settings.enableLocalConversationHistory) {
                      this.loadChat();
                      var t = this.getMessages();
                      t.length &&
                        ((this._isNewMessage = !1),
                        this._renderMessagesAndScroll(t.slice(), {}).then(
                          function () {
                            if (
                              ((e._isNewMessage = !0),
                              e._onLoadPreviousMessages(),
                              e.relativeTimestamp &&
                                (e.relativeTimestamp.setRelativeTime(
                                  new Date(t[t.length - 1].date)
                                ),
                                (e.relativeTimestampElement =
                                  e.relativeTimestamp.render()),
                                e._appendMessageToConversation(
                                  e.relativeTimestampElement
                                )),
                              e.settings.showPrevConvStatus)
                            ) {
                              var n = e.util.createElement("div", [
                                "hr",
                                "flex",
                              ]);
                              (n.innerText = e._localeText.previousChats),
                                e._appendMessageToConversation(n);
                            }
                          }
                        ));
                    }
                  }),
                  (t.prototype._sendInitMessages = function () {
                    var e = this;
                    if (!this.isInitMessageSent && this.isExpanded) {
                      var t = this.settings.initUserProfile;
                      if (
                        (t &&
                          this._core
                            .updateUser(t, {
                              sdkMetadata: { version: c.SDK_VERSION },
                            })
                            .then(function () {
                              e.isInitMessageSent = !0;
                            }),
                        this.settings.initUserHiddenMessage)
                      ) {
                        var n = this.settings.initUserHiddenMessage;
                        this.sendMessage(n, { hidden: !0, delegate: !1 }).then(
                          function () {
                            e.isInitMessageSent = !0;
                          }
                        );
                      }
                    }
                  }),
                  (t.prototype._ttsCancel = function () {
                    this._core.cancelTTS();
                  }),
                  t
                );
              })(g.Component);
            t.WidgetComponent = P;
          },
          4230: function (e, t, n) {
            var o,
              i =
                (this && this.__extends) ||
                ((o = function (e, t) {
                  return (o =
                    Object.setPrototypeOf ||
                    ({ __proto__: [] } instanceof Array &&
                      function (e, t) {
                        e.__proto__ = t;
                      }) ||
                    function (e, t) {
                      for (var n in t)
                        Object.prototype.hasOwnProperty.call(t, n) &&
                          (e[n] = t[n]);
                    })(e, t);
                }),
                function (e, t) {
                  if ("function" != typeof t && null !== t)
                    throw new TypeError(
                      "Class extends value " +
                        String(t) +
                        " is not a constructor or null"
                    );
                  function n() {
                    this.constructor = e;
                  }
                  o(e, t),
                    (e.prototype =
                      null === t
                        ? Object.create(t)
                        : ((n.prototype = t.prototype), new n()));
                });
            Object.defineProperty(t, "__esModule", { value: !0 }),
              (t.ChatFooterComponent = void 0);
            var r,
              a,
              s = n(5081),
              c = n(7496),
              l = n(4534),
              p = n(1489),
              h = n(1389),
              u = n(5949),
              d = n(2365),
              g = n(1001);
            !(function (e) {
              (e.ARROW_DOWN = "ArrowDown"),
                (e.ARROW_UP = "ArrowUp"),
                (e.ENTER = "Enter");
            })(r || (r = {})),
              (function (e) {
                (e[(e.KEYBOARD = 0)] = "KEYBOARD"),
                  (e[(e.VOICE = 1)] = "VOICE");
              })(a || (a = {}));
            var f = {
              AUDIO:
                ".aac, .amr, .m4a, .mp3, .mp4a, .mpga, .oga, .ogg, .wav, audio/*",
              FILE: ".7z, .csv, .doc, .docx, .eml, .ics, .key, .log, .msg, .neon, .numbers, .odt, .pages, .pdf, .pps, .ppsx, .ppt, .pptx, .rtf, .txt, .vcf, .xls, .xlsx, .xml, .yml, .yaml, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document",
              IMAGE:
                ".gif, .jfif, .jpeg, .jpg, .png, .svg, .tif, .tiff, .webp, image/*",
              VIDEO:
                ".3g2, .3gp, .avi, .m4v, .mov, .mp4, .mpeg, .mpg, .ogv, .qt, .webm, .wmv, video/*",
              ALL: "",
            };
            f.ALL = ""
              .concat(f.AUDIO, ",")
              .concat(f.FILE, ",")
              .concat(f.IMAGE, ",")
              .concat(f.VIDEO);
            var m = (function (e) {
              function t(t, n, o, i, r, c, p, h, u) {
                var d = e.call(this) || this;
                if (
                  ((d.util = t),
                  (d.onSend = n),
                  (d.onUpload = o),
                  (d.settings = i),
                  (d.onQueryChange = r),
                  (d.onSpeechToggle = c),
                  (d.onShareLocation = p),
                  (d.eventDispatcher = h),
                  (d.widget = u),
                  (d.mode = void 0),
                  (d.fileMaxSize = l.ATTACHMENT_MAX_SIZE),
                  (d._navKeys = []),
                  (d.isDisabledVoiceButtonLang = !1),
                  (d.isDisabledVoiceButtonNetwork = !1),
                  (d.recognitionRequested = !1),
                  (d.isFocusableDevice = !0),
                  (d.isTyping = !1),
                  (d.cssPrefix = i.name),
                  (d.i18n = i.i18n),
                  (d.icons = i.icons),
                  (d.locale = d.i18n[i.locale]),
                  (d.isFocusableDevice = !(0, s.isMobile)()),
                  (d._shareBtnID = "".concat(d.cssPrefix, "-share-button")),
                  (d.element = d._createElement()),
                  i.enableSpeech)
                ) {
                  var g = d._createVoiceComponent();
                  d.element.appendChild(g);
                }
                var f = d._createKeyboardComponent();
                return (
                  d.element.appendChild(f),
                  d.setInputMode(a.KEYBOARD),
                  d.disable(!0),
                  d
                );
              }
              return (
                i(t, e),
                (t.prototype.setInputMode = function (e) {
                  e !== this.mode &&
                    (this.settings.enableSpeech
                      ? ((this.mode = e),
                        this.mode === a.KEYBOARD
                          ? this._showKeyboardMode()
                          : this._showVoiceMode())
                      : ((this.mode = a.KEYBOARD), this._showKeyboardMode()));
                }),
                (t.prototype.setUserInputText = function (e) {
                  this._textArea &&
                    ((this._textArea.value = e),
                    this._textArea.setSelectionRange(e.length, e.length),
                    this.focusTextArea(),
                    this.updateSendButtonDisabledState());
                }),
                (t.prototype.getUserInputText = function () {
                  return this._textArea.value;
                }),
                (t.prototype.setUserInputPlaceholder = function (e) {
                  this._textArea && y(this._textArea, e);
                }),
                (t.prototype.setVoiceRecording = function (e) {
                  this.settings.enableSpeech &&
                    (e && this.recognitionRequested
                      ? this.setInputMode(a.VOICE)
                      : e || this.setInputMode(a.KEYBOARD));
                }),
                (t.prototype.updateVisualizer = function (e, t) {
                  this.mode === a.VOICE &&
                    (0, s.drawVisualizer)(e, this._visualizerCanvas, t);
                }),
                (t.prototype.focusTextArea = function () {
                  this.isFocusableDevice && this._textArea.focus(),
                    (this._textArea.scrollTop = this._textArea.scrollHeight);
                }),
                (t.prototype.render = function (e) {}),
                (t.prototype.disable = function (e) {
                  void 0 === e && (e = !0);
                  var t = this.util,
                    n = "disabled";
                  this.settings.enableAttachment &&
                    (this._shareButton.disabled = e),
                    e
                      ? (t.addCSSClass(this._textArea, n),
                        this.settings.enableAutocomplete &&
                          (this._invalidateSuggestions(),
                          this._removeSuggestionsPopup()))
                      : (t.removeCSSClass(this._textArea, n),
                        this.updateSendButtonDisabledState()),
                    this.settings.enableSpeech &&
                      (this.setInputMode(a.KEYBOARD),
                      this.disableVoiceModeButton(e, { src: "network" })),
                    (this.isFooterDisabled = e);
                }),
                (t.prototype.isDisabled = function () {
                  return this.isFooterDisabled;
                }),
                (t.prototype.disableVoiceModeButton = function (e, t) {
                  var n = t.src;
                  if (this.settings.enableSpeech) {
                    switch (n) {
                      case "lang":
                        this.isDisabledVoiceButtonLang = e;
                        break;
                      case "network":
                        this.isDisabledVoiceButtonNetwork = e;
                    }
                    this.settings.multiLangChat &&
                    (this.isDisabledVoiceButtonLang ||
                      this.isDisabledVoiceButtonNetwork)
                      ? (this._switchToVoiceModeButton.disabled = !0)
                      : (this._switchToVoiceModeButton.disabled =
                          this.isDisabledVoiceButtonNetwork);
                  }
                }),
                (t.prototype.displaySuggestions = function (e) {
                  if ((this._removeSuggestionsPopup(), 0 === e.length))
                    (this._suggestions = e), (this._isSuggestionsValid = !1);
                  else if (this._textArea.value) {
                    (this._currentSuggestionFocus =
                      e.length > l.Constants.MAX_SUGGESTIONS_COUNT
                        ? l.Constants.MAX_SUGGESTIONS_COUNT
                        : e.length < l.Constants.MIN_SUGGESTIONS_COUNT
                        ? l.Constants.MIN_SUGGESTIONS_COUNT
                        : e.length),
                      (this._suggestions = e),
                      (this._isSuggestionsValid = !0);
                    var n = this.util.createDiv(
                      this.settings.enableAttachment
                        ? ["autocomplete-items"]
                        : ["autocomplete-items", "no-attach"]
                    );
                    n.setAttribute("role", "list");
                    var o = this._textArea.value.trim();
                    n.id = t.SUGGESTIONS_ID;
                    for (
                      var i = this._currentSuggestionFocus - 1;
                      i > -1;
                      i--
                    ) {
                      var r = this._createSuggestionListItem(e[i], o);
                      n.appendChild(r);
                    }
                    this.element.appendChild(n);
                  }
                }),
                (t.prototype.getSuggestions = function () {
                  return this._suggestions;
                }),
                (t.prototype.getSuggestionsValid = function () {
                  return this._isSuggestionsValid;
                }),
                (t.prototype.setLocale = function (e) {
                  var t = this;
                  if (((this.locale = e), this._shareButton)) {
                    var n = e.upload;
                    b(this._uploadFileInput, n),
                      this._shareMenu
                        .querySelectorAll("li")
                        .forEach(function (e) {
                          var n = e.dataset.value,
                            o =
                              t.locale[
                                "share".concat(
                                  n.charAt(0).toUpperCase() +
                                    n.substring(1).toLowerCase()
                                )
                              ] ||
                              t.locale[n] ||
                              e;
                          ((
                            e.querySelector("svg") || e.querySelector("img")
                          ).ariaLabel = o),
                            (e.querySelector("span").innerText = o);
                        });
                  }
                  this.setUserInputPlaceholder(e.inputPlaceholder),
                    this._sendButton && w(this._sendButton, e.send),
                    this._switchToVoiceModeButton &&
                      w(this._switchToVoiceModeButton, e.speak);
                }),
                (t.prototype._createElement = function () {
                  return this.util.createDiv(["footer"]);
                }),
                (t.prototype._showKeyboardMode = function () {
                  var e,
                    t = this.util;
                  t.removeCSSClass(this.element, "mode-voice"),
                    t.addCSSClass(this.element, "mode-keyboard"),
                    this.updateSendButtonDisabledState(),
                    this.settings.enableAutocomplete &&
                      (null === (e = this._textArea.value) || void 0 === e
                        ? void 0
                        : e.trim().length) >= 3 &&
                      this._setSuggestionsRequestTimer();
                }),
                (t.prototype._showVoiceMode = function () {
                  var e = this.util;
                  e.removeCSSClass(this.element, "mode-keyboard"),
                    e.addCSSClass(this.element, "mode-voice"),
                    this.updateSendButtonDisabledState(),
                    this._textArea && this._removeSuggestionsPopup();
                }),
                (t.prototype._createKeyboardComponent = function () {
                  var e = this.util,
                    t = e.createDiv(["footer-mode-keyboard", "flex"]);
                  (this._textArea = this._createInputTextArea()),
                    t.appendChild(this._textArea);
                  var n = e.createDiv(["footer-actions", "flex"]),
                    o = this._createSendMessageButton();
                  if (
                    ((this._sendButton = o),
                    n.appendChild(o),
                    this.settings.enableSpeech &&
                      ((this._switchToVoiceModeButton =
                        this._createVoiceSwitchButton()),
                      n.appendChild(this._switchToVoiceModeButton)),
                    this.settings.enableSpeech)
                  ) {
                    var i = this._createKeyboardSwitchButton();
                    n.appendChild(i);
                  }
                  if (this.settings.enableAttachment) {
                    var r = this._createShareComponent();
                    n.appendChild(r);
                  }
                  return t.appendChild(n), t;
                }),
                (t.prototype._createShareComponent = function () {
                  var e = this,
                    t = this.util,
                    n = t.createDiv(),
                    o = v(this.util, {
                      css: ["button-upload", "flex"],
                      customIcon: this.icons.shareMenu,
                      defaultIcon: h.iconAttach,
                      title: this.locale.upload,
                    });
                  o.id = this._shareBtnID;
                  var i = t.createElement("input", ["none"]);
                  (i.type = "file"),
                    (i.tabIndex = -1),
                    i.setAttribute("aria-hidden", "true"),
                    b(i, this.locale.upload),
                    (this._uploadFileInput = i),
                    (this._shareMenu = this._getShareMenu(o));
                  var r = t.getMenuButton({
                    button: o,
                    menuId: this._shareMenu.id,
                    menu: this._shareMenu,
                  });
                  return (
                    (0, p.on)(r, "click", function (t) {
                      e._removeSuggestionsPopup();
                    }),
                    (this._shareButton = r),
                    document.addEventListener(
                      "deviceready",
                      function () {
                        var t = globalThis
                          ? globalThis.device
                          : window
                          ? window.device
                          : void 0;
                        "Android" === (null == t ? void 0 : t.platform) &&
                          e._uploadFileInput.removeAttribute("accept");
                      },
                      !1
                    ),
                    (0, p.on)(i, "click", function () {
                      return (i.value = null);
                    }),
                    (0, p.on)(i, "change", function (t) {
                      var n = t.target;
                      n.files && n.files.length && e._onUpload(n.files[0]);
                    }),
                    n.appendChild(this._shareButton),
                    n.appendChild(this._shareMenu),
                    n.appendChild(i),
                    n
                  );
                }),
                (t.prototype._getShareMenu = function (e) {
                  return this.util.getMenu({
                    menuId: "".concat(this.settings.name, "-share-menu"),
                    menuClassList: ["share-popup-list"],
                    buttonId: this._shareBtnID,
                    menuItems: this._getShareItems(),
                    menuButton: e,
                  });
                }),
                (t.prototype._getShareItems = function () {
                  var e = this,
                    t = this.util,
                    n = this.icons,
                    o = this.locale,
                    i = this._uploadFileInput,
                    r = "".concat(this.cssPrefix, "-share-"),
                    a = this.settings.shareMenuItems,
                    s = [],
                    c = new Set();
                  if (
                    ((null == a ? void 0 : a.length) ||
                      (a = [
                        g.ShareCategory.AUDIO,
                        g.ShareCategory.FILE,
                        g.ShareCategory.LOCATION,
                        g.ShareCategory.VISUAL,
                      ]),
                    a.forEach(function (e) {
                      "string" == typeof e && c.add(e.toLowerCase());
                    }),
                    c.has(g.ShareCategory.VISUAL))
                  ) {
                    var p = "".concat(r, "visual"),
                      u = n.shareMenuVisual || h.iconShareMedia;
                    s.push(
                      t.createListItem(
                        p,
                        o.shareVisual,
                        "visual",
                        u,
                        "share-popup-item",
                        function () {
                          (i.accept = "".concat(f.IMAGE, ",").concat(f.VIDEO)),
                            i.click();
                        }
                      )
                    );
                  }
                  c.has(g.ShareCategory.AUDIO) &&
                    ((p = "".concat(r, "audio")),
                    (u = n.shareMenuAudio || h.iconShareAudio),
                    s.push(
                      t.createListItem(
                        p,
                        o.shareAudio,
                        "audio",
                        u,
                        "share-popup-item",
                        function () {
                          (i.accept = f.AUDIO), i.click();
                        }
                      )
                    )),
                    c.has(g.ShareCategory.FILE) &&
                      ((p = "".concat(r, "file")),
                      (u = n.shareMenuFile || h.iconShareFile),
                      s.push(
                        t.createListItem(
                          p,
                          o.shareFile,
                          "file",
                          u,
                          "share-popup-item",
                          function () {
                            (i.accept = f.FILE), i.click();
                          }
                        )
                      )),
                    c.has(g.ShareCategory.LOCATION) &&
                      ((p = "".concat(r, "location")),
                      (u = n.shareMenuLocation || h.iconShareLocation),
                      s.push(
                        t.createListItem(
                          p,
                          o.shareLocation,
                          "location",
                          u,
                          "share-popup-item",
                          function () {
                            return e.onShareLocation();
                          }
                        )
                      ));
                  var d = n.shareMenuFile || h.iconShareFile;
                  return (
                    this.settings.shareMenuItems
                      .filter(function (e) {
                        return (
                          "string" != typeof e && "string" == typeof e.type
                        );
                      })
                      .forEach(function (n) {
                        var r = n.type.toLowerCase(),
                          a = "share_".concat(
                            r.indexOf("*") >= 0 ? "all" : r.replace(/ /g, "_")
                          ),
                          c = "".concat(e.cssPrefix, "-").concat(a),
                          p = o[a] || e.i18n.en[a],
                          h = n.label;
                        p ? (h = p) : (e.i18n.en[a] = h);
                        var u = n.icon || d,
                          g =
                            n.maxSize && n.maxSize >= 1
                              ? Math.min(
                                  n.maxSize * l.BYTE_MULTIPLIER,
                                  l.ATTACHMENT_MAX_SIZE
                                )
                              : l.ATTACHMENT_MAX_SIZE,
                          m =
                            r.indexOf("*") >= 0
                              ? f.ALL
                              : r
                                  .split(" ")
                                  .filter(function (e) {
                                    return f.ALL.indexOf(e) >= 0;
                                  })
                                  .map(function (e) {
                                    return ".".concat(e, " ");
                                  })
                                  .join(",");
                        s.push(
                          t.createListItem(
                            c,
                            h,
                            a,
                            u,
                            "share-popup-item",
                            function () {
                              (e.fileMaxSize = g), (i.accept = m), i.click();
                            }
                          )
                        );
                      }),
                    s
                  );
                }),
                (t.prototype._createInputTextArea = function () {
                  var e = this,
                    t = ["user-input"];
                  this.settings.enableSpeech &&
                    t.push("user-input-inline-send");
                  var n = this.util.createElement("textarea", t);
                  return (
                    (function (e, t) {
                      y(e, t), C(e, t);
                    })(n, this.locale.inputPlaceholder),
                    (n.rows = 1),
                    (n.onkeydown = this.onInputKeyDown.bind(this)),
                    (n.onkeyup = this.onInputKeyUp.bind(this)),
                    (n.oninput = function () {
                      var t = n.value;
                      (e.widget.speechFinalResult = e.widget
                        .speechFinalResult || { speechId: "", text: "" }),
                        (e.widget.speechFinalResult.text = t),
                        e._expand();
                    }),
                    (0, p.on)(n, "paste", function () {
                      e.isFooterDisabled ||
                        setTimeout(e.updateSendButtonDisabledState.bind(e));
                    }),
                    this._handleInputChange(n),
                    n
                  );
                }),
                (t.prototype._handleInputChange = function (e) {
                  var t = this,
                    n = Object.getOwnPropertyDescriptor(
                      HTMLTextAreaElement.prototype,
                      "value"
                    );
                  Object.defineProperty(e, "value", {
                    set: function (o) {
                      n.set.call(e, o),
                        t.updateSendButtonDisabledState(),
                        t._expand();
                    },
                    get: n.get,
                  });
                }),
                (t.prototype._createSendMessageButton = function () {
                  var e = this,
                    t = ["button-send"];
                  this.settings.enableSpeech && t.push("button-send-inline");
                  var n = v(this.util, {
                    css: t,
                    customIcon: this.icons.send,
                    defaultIcon: h.iconSend,
                    title: this.locale.send,
                  });
                  return (
                    (n.onclick = function () {
                      var t, n;
                      e._isUserInputEmpty() ||
                        ((e._previousInputValue = void 0),
                        (e._textArea.value =
                          null ===
                            (n =
                              null === (t = e._textArea) || void 0 === t
                                ? void 0
                                : t.value.trim()) || void 0 === n
                            ? void 0
                            : n.replace("\n", "")),
                        e.settings.enableAutocomplete &&
                          (e._invalidateSuggestions(),
                          e._removeSuggestionsPopup()),
                        e._onSend());
                    }),
                    n
                  );
                }),
                (t.prototype._createVoiceSwitchButton = function () {
                  var e = this,
                    t = v(this.util, {
                      css: ["button-switch-voice"],
                      customIcon: this.icons.mic,
                      defaultIcon: h.iconMic,
                      title: this.locale.speak,
                    });
                  return (
                    (t.onclick = function () {
                      e.onSpeechToggle(!0), (e.recognitionRequested = !0);
                    }),
                    t
                  );
                }),
                (t.prototype._createVoiceComponent = function () {
                  var e = this.util,
                    t = e.createDiv(["footer-mode-voice", "flex"]),
                    n = e.createDiv(["footer-visualizer-wrapper"]);
                  return (
                    (this._visualizerCanvas = e.createElement("canvas")),
                    (this._visualizerCanvas.width = 244),
                    (this._visualizerCanvas.height = 32),
                    n.appendChild(this._visualizerCanvas),
                    t.appendChild(n),
                    t
                  );
                }),
                (t.prototype._createKeyboardSwitchButton = function () {
                  var e = this,
                    t = v(this.util, {
                      css: ["button-switch-kbd"],
                      customIcon: this.icons.keyboard,
                      defaultIcon: h.iconKeyboard,
                      title: this.locale.inputPlaceholder,
                    });
                  return (
                    (t.onclick = function () {
                      (e.recognitionRequested = !1), e.onSpeechToggle(!1);
                    }),
                    t
                  );
                }),
                (t.prototype.updateSendButtonDisabledState = function () {
                  var e = this._sendButton;
                  if (e && e.nodeType) {
                    var t = this.util,
                      n = "none",
                      o = this._textArea;
                    o &&
                    o.value &&
                    o.value.trim().length &&
                    this.mode !== a.VOICE
                      ? t.removeCSSClass(this._sendButton, n)
                      : t.addCSSClass(e, n);
                  }
                }),
                (t.prototype._isUserInputEmpty = function () {
                  return (
                    !this._textArea || 0 === this._textArea.value.trim().length
                  );
                }),
                (t.prototype.onInputKeyDown = function (e) {
                  var t;
                  this.isDisabled() ||
                    e.isComposing ||
                    229 === e.keyCode ||
                    (e.code === s.KeyCode.Return &&
                      !e.shiftKey &&
                      (null === (t = this._textArea.value) || void 0 === t
                        ? void 0
                        : t.trim().length) > 0 &&
                      (e.preventDefault(), this._sendButton.click()));
                }),
                (t.prototype.onInputKeyUp = function (e) {
                  var t,
                    n = this;
                  if (this.isDisabled())
                    return (
                      this._invalidateSuggestions(),
                      void this._removeSuggestionsPopup()
                    );
                  this.isTyping ||
                    ((this.isTyping = !0),
                    this.eventDispatcher.trigger(
                      c.ChatEvent.TYPING,
                      this.isTyping
                    )),
                    clearTimeout(this.typingTimer),
                    (this.typingTimer = window.setTimeout(function () {
                      (n.isTyping = !1),
                        n.eventDispatcher.trigger(
                          c.ChatEvent.TYPING,
                          n.isTyping
                        );
                    }, 1e3));
                  var o =
                    null === (t = this._textArea.value) || void 0 === t
                      ? void 0
                      : t.trim();
                  if (
                    (this.updateSendButtonDisabledState(),
                    !e.isComposing && this.settings.enableAutocomplete)
                  ) {
                    if (this._onNavigateSuggestion(e)) return;
                    e.code === s.KeyCode.Backspace &&
                      ((this._previousInputValue = void 0),
                      this._invalidateSuggestions(),
                      this._removeSuggestionsPopup(),
                      clearTimeout(this._suggestionsRequest)),
                      this._getNavKeys().indexOf(e.code) < 0 &&
                        (o.length >= 3
                          ? this._previousInputValue !== this._textArea.value &&
                            ((this._previousInputValue = this._textArea.value),
                            clearTimeout(this._suggestionsRequest),
                            this._setSuggestionsRequestTimer())
                          : ((this._previousInputValue = void 0),
                            this._removeSuggestionsPopup(),
                            clearTimeout(this._suggestionsRequest)));
                  }
                }),
                (t.prototype._expand = function () {
                  this._textArea.style.height = null;
                  var e = 0.6 * this.widget.chatWidgetDiv.clientHeight,
                    t = this._textArea.scrollHeight;
                  this._textArea.style.height = "".concat(t < e ? t : e, "px");
                }),
                (t.prototype._onNavigateSuggestion = function (e) {
                  var n = !1,
                    o = document.getElementById(t.SUGGESTIONS_ID);
                  if (o) {
                    var i = o.getElementsByTagName("div");
                    e.code === s.KeyCode.Down
                      ? (e.preventDefault(),
                        this._currentSuggestionFocus < i.length - 1
                          ? (this._currentSuggestionFocus++, this._addActive(i))
                          : (this._removeActive(i),
                            (this._textArea.value = this._currentInputValue
                              ? this._currentInputValue
                              : this._textArea.value),
                            (this._currentSuggestionFocus = i.length)),
                        (n = !0))
                      : e.code === s.KeyCode.Up &&
                        (e.preventDefault(),
                        this._currentSuggestionFocus === i.length &&
                          (this._currentInputValue = this._textArea.value),
                        this._currentSuggestionFocus > 0 &&
                          this._currentSuggestionFocus--,
                        this._addActive(i),
                        (n = !0));
                  }
                  return n;
                }),
                (t.prototype._addActive = function (e) {
                  e &&
                    (this._removeActive(e),
                    this.util.addCSSClass(
                      e[this._currentSuggestionFocus],
                      "autocomplete-active"
                    ),
                    e[this._currentSuggestionFocus].scrollIntoView(),
                    (this._textArea.value =
                      e[this._currentSuggestionFocus].innerText));
                }),
                (t.prototype._removeActive = function (e) {
                  for (var t = 0, n = e; t < n.length; t++) {
                    var o = n[t];
                    this.util.removeCSSClass(o, "autocomplete-active");
                  }
                }),
                (t.prototype._removeSuggestionsPopup = function () {
                  var e = document.getElementById(t.SUGGESTIONS_ID);
                  e && e.remove();
                }),
                (t.prototype._onSend = function () {
                  this.onSend(this._textArea.value),
                    (this._textArea.value = ""),
                    (this._textArea.innerText = ""),
                    setTimeout(this._expand.bind(this));
                }),
                (t.prototype._onUpload = function (e) {
                  var t = this.fileMaxSize;
                  (this.fileMaxSize = l.ATTACHMENT_MAX_SIZE),
                    this.onUpload(e, { maxSize: t }),
                    (this._uploadFileInput.value = "");
                }),
                (t.prototype._onQueryChange = function () {
                  this.onQueryChange(this._textArea.value.trim()).catch(
                    function () {}
                  );
                }),
                (t.prototype._setSuggestionsRequestTimer = function () {
                  var e = this;
                  this._suggestionsRequest = setTimeout(function () {
                    e._onQueryChange();
                  }, 300);
                }),
                (t.prototype._invalidateSuggestions = function () {
                  (this._suggestions = null), (this._isSuggestionsValid = !1);
                }),
                (t.prototype._getNavKeys = function () {
                  if (!this._navKeys.length)
                    for (var e = 0, t = Object.keys(r); e < t.length; e++) {
                      var n = t[e];
                      this._navKeys.push(r[n]);
                    }
                  return this._navKeys;
                }),
                (t.prototype._createSuggestionListItem = function (e, t) {
                  var n = this,
                    o = this.util,
                    i = o.createDiv();
                  i.setAttribute("role", "listitem"),
                    (i.onclick = function () {
                      (n._textArea.value = i.innerText),
                        n._removeSuggestionsPopup(),
                        n._sendButton.click();
                    });
                  var r = new RegExp(t, "i"),
                    a = e.match(r);
                  if (a) {
                    if (0 !== a.index) {
                      var s = o.createElement("span");
                      (s.textContent = e.substr(0, a.index)), i.appendChild(s);
                    }
                    var c = o.createElement("strong");
                    if (
                      ((c.textContent = e.substr(a.index, t.length)),
                      i.appendChild(c),
                      a.index + t.length !== e.length)
                    ) {
                      var l = o.createElement("span");
                      (l.textContent = e.substring(a.index + t.length)),
                        i.appendChild(l);
                    }
                  } else i.textContent = e;
                  return i;
                }),
                (t.SUGGESTIONS_ID = "chat_widget_suggestions"),
                t
              );
            })(d.Component);
            function v(e, t) {
              var n = t.css,
                o = t.customIcon,
                i = t.defaultIcon,
                r = t.title,
                a = o || i,
                s = [
                  (0, u.isSVG)(a)
                    ? "footer-button-svg-icon"
                    : "footer-button-icon",
                ];
              return e.createIconButton({
                css: ["footer-button", "flex"].concat(n),
                icon: a,
                iconCss: s,
                title: r,
              });
            }
            function b(e, t) {
              w(e, t), C(e, t);
            }
            function w(e, t) {
              e.title = t;
            }
            function y(e, t) {
              e.placeholder = t;
            }
            function C(e, t) {
              e.setAttribute("aria-label", t);
            }
            t.ChatFooterComponent = m;
          },
          8414: function (e, t, n) {
            var o,
              i =
                (this && this.__extends) ||
                ((o = function (e, t) {
                  return (o =
                    Object.setPrototypeOf ||
                    ({ __proto__: [] } instanceof Array &&
                      function (e, t) {
                        e.__proto__ = t;
                      }) ||
                    function (e, t) {
                      for (var n in t)
                        Object.prototype.hasOwnProperty.call(t, n) &&
                          (e[n] = t[n]);
                    })(e, t);
                }),
                function (e, t) {
                  if ("function" != typeof t && null !== t)
                    throw new TypeError(
                      "Class extends value " +
                        String(t) +
                        " is not a constructor or null"
                    );
                  function n() {
                    this.constructor = e;
                  }
                  o(e, t),
                    (e.prototype =
                      null === t
                        ? Object.create(t)
                        : ((n.prototype = t.prototype), new n()));
                });
            Object.defineProperty(t, "__esModule", { value: !0 }),
              (t.ChatHeaderComponent = void 0);
            var r = n(2365),
              a = n(1389),
              s = n(8798),
              c = n(6166),
              l = (function (e) {
                function t(t, n, o, i, r, a, l) {
                  var p = e.call(this) || this;
                  return (
                    (p.settings = t),
                    (p.util = n),
                    (p.onClose = o),
                    (p.onClearMessage = i),
                    (p.onAudioToggle = r),
                    (p.core = a),
                    (p.onEndConversation = l),
                    (p.logger = new s.Logger("ChatHeaderComponent")),
                    (p.headerActions = []),
                    (p.menuActions = []),
                    (p.cssPrefix = t.name),
                    (p.i18n = p.settings.i18n),
                    (p.element = p._createElement()),
                    p.settings.showConnectionStatus &&
                      p.core.on(c.CoreEvent.State, function (e) {
                        return p.updateStatusMessage(e);
                      }),
                    p.disable(!0),
                    p
                  );
                }
                return (
                  i(t, e),
                  (t.prototype.render = function () {}),
                  (t.prototype.addLanguageSelect = function (e) {
                    var t = !(!this.menuActions || !this.menuActions.length);
                    (this.multiLangControl = e.render(t)),
                      t
                        ? this.actionsMenu.appendChild(this.multiLangControl)
                        : this.actionsContainer.prepend(this.multiLangControl);
                  }),
                  (t.prototype.closeWidgetPopup = function () {
                    this.onClose();
                  }),
                  (t.prototype.clearHistory = function () {
                    this.onClearMessage();
                  }),
                  (t.prototype.showTTSButton = function (e) {
                    var t = this.audioActionElem;
                    t && (t.style.display = e ? "flex" : "none");
                  }),
                  (t.prototype.disableTTSButton = function (e) {
                    if (this.audioActionElem) {
                      var t = this.util,
                        n = this.audioActionElem;
                      if ("LI" === n.tagName) {
                        var o = "disable";
                        e ? t.addCSSClass(n, o) : t.removeCSSClass(n, o);
                      } else this.audioActionElem.disabled = e;
                    }
                  }),
                  (t.prototype.setLocale = function (e) {
                    this.currentTranslations = e;
                    var t = e.chatTitle;
                    t &&
                      ((this.title.innerText = t),
                      (this.title.title = t),
                      this.logo && (this.logo.title = t));
                    var n = e.chatSubtitle;
                    function o(e, t) {
                      "LI" === e.tagName
                        ? ((e.querySelector("svg").ariaLabel = t),
                          (e.querySelector("span").innerText = t))
                        : (e.title = t);
                    }
                    n
                      ? ((this.subtitle.innerText = t),
                        (this.subtitle.title = n))
                      : this.settings.showConnectionStatus &&
                        this.updateStatusMessage(this.chatStatus),
                      this.endActionElem &&
                        o(this.endActionElem, e.endConversation),
                      this.closeActionElem && o(this.closeActionElem, e.close),
                      this.clearActionElem && o(this.clearActionElem, e.clear),
                      this.audioActionElem &&
                        o(
                          this.audioActionElem,
                          this._audioActionElemOn
                            ? e.audioResponseOn
                            : e.audioResponseOff
                        ),
                      this.multiLangControl &&
                        o(this.multiLangControl, e.languageSelectDropdown);
                  }),
                  (t.prototype.disable = function (e) {
                    void 0 === e && (e = !0),
                      this.settings.enableEndConversation &&
                        (this.endActionElem.disabled = e);
                  }),
                  (t.prototype._createElement = function () {
                    var e,
                      t = this,
                      n = this.util,
                      o = this.settings,
                      i = o.icons,
                      r = n.createDiv(["header", "flex"]),
                      s = n.createDiv(["header-info-wrapper"]),
                      c = n.createDiv(["header-actions", "flex"]),
                      l = o.locale,
                      p = this.i18n[l],
                      h = p.chatTitle,
                      u = p.chatSubtitle;
                    if (!("logo" in i) || i.logo) {
                      var d = n.createImageIcon({
                        icon: i.logo || a.iconLogo,
                        iconCss: ["logo"],
                        title: h,
                      });
                      r.appendChild(d), (this.logo = d);
                    }
                    if (h) {
                      var g = n.createDiv(["title"]);
                      (g.id = "".concat(o.name, "-title")),
                        (g.innerText = h),
                        (g.title = h),
                        s.appendChild(g),
                        (this.title = g);
                    }
                    if (u) {
                      var f = n.createDiv(["subtitle"]);
                      (f.innerText = u),
                        (f.title = u),
                        s.appendChild(f),
                        (o.showConnectionStatus = !1),
                        (this.subtitle = f);
                    } else
                      o.showConnectionStatus &&
                        ((this.networkStatus = n.createDiv([
                          "connection-status",
                          "disconnected",
                        ])),
                        (this.networkStatus.innerText = p.disconnected),
                        (this.networkStatus.title =
                          this.networkStatus.innerText),
                        s.appendChild(this.networkStatus));
                    r.appendChild(s);
                    var m = n.createDiv(["header-gap"]);
                    if ((r.appendChild(m), o.customHeaderElementId)) {
                      var v = document.getElementById(o.customHeaderElementId);
                      if (v) {
                        var b = n.createDiv(["header-custom-element"]);
                        b.appendChild(v), r.appendChild(b);
                      } else
                        this.logger.error(
                          "Could not find element with ID '".concat(
                            o.customHeaderElementId,
                            "'. No custom element added to the chat header."
                          )
                        );
                    }
                    if (
                      ((this.actionsContainer = c), o.enableEndConversation)
                    ) {
                      var w = i.close || a.iconClose;
                      this.headerActions.push({
                        name: "end-conversation",
                        title: p.endConversation,
                        icon: w,
                        clickHandler: this.onEndConversation.bind(this),
                      });
                    }
                    return (
                      o.embedded ||
                        ((w = i.collapse || a.iconCollapse),
                        this.headerActions.push({
                          name: "collapse",
                          title: p.close,
                          icon: w,
                          clickHandler: this.closeWidgetPopup.bind(this),
                        })),
                      o.enableBotAudioResponse &&
                        ((this._audioActionElemOn = !o.initBotAudioMuted),
                        this.headerActions.push({
                          name: "tts",
                          title: this._audioActionElemOn
                            ? p.audioResponseOn
                            : p.audioResponseOff,
                          icon: this._audioActionElemOn
                            ? i.ttsOn || a.iconTTSUnmute
                            : i.ttsOff || a.iconTTSMute,
                          clickHandler: function () {
                            (t._audioActionElemOn = !t._audioActionElemOn),
                              t.setAudioResponseIcon(p),
                              t.onAudioToggle(t._audioActionElemOn);
                          },
                        })),
                      o.enableClearMessage &&
                        ((w = i.clearHistory || a.iconClearHistory),
                        this.headerActions.push({
                          name: "clear",
                          title: p.clear,
                          icon: w,
                          clickHandler: this.clearHistory.bind(this),
                        })),
                      null === (e = this.headerActions) ||
                        void 0 === e ||
                        e.forEach(function (e, o) {
                          var i = t.settings.multiLangChat
                            ? t.headerActions.length + 1
                            : t.headerActions.length;
                          if (
                            !t.settings.enableHeaderActionCollapse ||
                            (o < 2 && !(i > 2 && 1 === o))
                          ) {
                            var r = n.createIconButton({
                              css: ["header-button"],
                              icon: e.icon,
                              iconCss: ["header-button-icon"],
                              title: e.title,
                            });
                            (r.onclick = e.clickHandler),
                              t.mapActionElems(e, r),
                              t.actionsContainer.prepend(r);
                          } else t.menuActions.push(e);
                        }),
                      this.menuActions &&
                        this.menuActions.length &&
                        this.createActionMenu(this.menuActions),
                      r.appendChild(c),
                      r
                    );
                  }),
                  (t.prototype.mapActionElems = function (e, t) {
                    switch (
                      ((t.id = "".concat(this.cssPrefix, "-").concat(e.name)),
                      e.name)
                    ) {
                      case "end-conversation":
                        this.endActionElem = t;
                        break;
                      case "collapse":
                        this.closeActionElem = t;
                        break;
                      case "tts":
                        this.audioActionElem = t;
                        break;
                      case "clear":
                        this.clearActionElem = t;
                    }
                  }),
                  (t.prototype.createActionMenu = function (e) {
                    var t = this,
                      n = this.util,
                      o = "".concat(this.settings.name, "-action-menu"),
                      i = "".concat(o, "-button"),
                      r = e.map(function (e) {
                        var o = n.createListItem(
                          "action-menu-option-".concat(e.name),
                          e.title,
                          e.name,
                          e.icon,
                          "action-item",
                          e.clickHandler
                        );
                        return t.mapActionElems(e, o), o;
                      }),
                      s = n.createIconButton({
                        css: ["header-button", "button-close"],
                        icon: a.iconExpand,
                        iconCss: ["header-button-icon"],
                        title: this.i18n[this.settings.locale].showOptions,
                      }),
                      c = n.getMenu({
                        menuId: o,
                        menuClassList: ["action-menu"],
                        menuItems: r,
                        buttonId: i,
                        menuButton: s,
                      }),
                      l = n.getMenuButton({ button: s, menuId: o, menu: c });
                    this.actionsContainer.prepend(l),
                      this.actionsContainer.appendChild(c),
                      (this.actionsMenu = c);
                  }),
                  (t.prototype.setAudioResponseIcon = function (e) {
                    var t = this.util,
                      n = this.currentTranslations || e,
                      o = this.settings.icons;
                    this.audioActionElem.innerHTML = "";
                    var i = this._audioActionElemOn
                        ? n.audioResponseOn
                        : n.audioResponseOff,
                      r = this._audioActionElemOn
                        ? o.ttsOn || a.iconTTSUnmute
                        : o.ttsOff || a.iconTTSMute,
                      s = "LI" === this.audioActionElem.tagName,
                      c = t.createImageIcon({
                        icon: r,
                        iconCss: [
                          s ? "icon" : "header-button-icon",
                          "action-item-icon",
                        ],
                        title: i,
                      });
                    if (s) {
                      this.audioActionElem.appendChild(c);
                      var l = t.createElement("span", [
                        "text",
                        "action-item-text",
                        "ellipsis",
                      ]);
                      (l.innerText = i), this.audioActionElem.appendChild(l);
                    } else
                      this.audioActionElem.appendChild(c),
                        (this.audioActionElem.title = i);
                  }),
                  (t.prototype.updateStatusMessage = function (e) {
                    var t = this.util,
                      n = "connecting",
                      o = "connected",
                      i = "disconnected",
                      r = this.networkStatus;
                    this.chatStatus = e;
                    var a =
                      this.currentTranslations ||
                      this.i18n[this.settings.locale];
                    switch (e) {
                      case c.ConnectionState.Open:
                        (r.innerText = a.connected),
                          t.removeCSSClass(r, n, i),
                          t.addCSSClass(r, o);
                        break;
                      case c.ConnectionState.Closed:
                        (r.innerText = a.disconnected),
                          t.removeCSSClass(r, n, o),
                          t.addCSSClass(r, i);
                        break;
                      case c.ConnectionState.Closing:
                        (r.innerText = a.closing),
                          t.removeCSSClass(r, o, i),
                          t.addCSSClass(r, n);
                        break;
                      case c.ConnectionState.Connecting:
                        (r.innerText = a.connecting),
                          t.removeCSSClass(r, o, i),
                          t.addCSSClass(r, n);
                    }
                    r.title = r.innerText;
                  }),
                  t
                );
              })(r.Component);
            t.ChatHeaderComponent = l;
          },
          3777: function (e, t, n) {
            var o,
              i =
                (this && this.__extends) ||
                ((o = function (e, t) {
                  return (o =
                    Object.setPrototypeOf ||
                    ({ __proto__: [] } instanceof Array &&
                      function (e, t) {
                        e.__proto__ = t;
                      }) ||
                    function (e, t) {
                      for (var n in t)
                        Object.prototype.hasOwnProperty.call(t, n) &&
                          (e[n] = t[n]);
                    })(e, t);
                }),
                function (e, t) {
                  if ("function" != typeof t && null !== t)
                    throw new TypeError(
                      "Class extends value " +
                        String(t) +
                        " is not a constructor or null"
                    );
                  function n() {
                    this.constructor = e;
                  }
                  o(e, t),
                    (e.prototype =
                      null === t
                        ? Object.create(t)
                        : ((n.prototype = t.prototype), new n()));
                });
            Object.defineProperty(t, "__esModule", { value: !0 }),
              (t.WidgetMainComponent = void 0);
            var r = (function (e) {
              function t(t) {
                var n = e.call(this) || this;
                return (n.element = t.createDiv(["conversation"])), n;
              }
              return i(t, e), (t.prototype.render = function (e) {}), t;
            })(n(2365).Component);
            t.WidgetMainComponent = r;
          },
          8861: function (e, t, n) {
            var o =
                (this && this.__assign) ||
                function () {
                  return (o =
                    Object.assign ||
                    function (e) {
                      for (var t, n = 1, o = arguments.length; n < o; n++)
                        for (var i in (t = arguments[n]))
                          Object.prototype.hasOwnProperty.call(t, i) &&
                            (e[i] = t[i]);
                      return e;
                    }).apply(this, arguments);
                },
              i =
                (this && this.__spreadArray) ||
                function (e, t, n) {
                  if (n || 2 === arguments.length)
                    for (var o, i = 0, r = t.length; i < r; i++)
                      (!o && i in t) ||
                        (o || (o = Array.prototype.slice.call(t, 0, i)),
                        (o[i] = t[i]));
                  return e.concat(o || Array.prototype.slice.call(t));
                };
            Object.defineProperty(t, "__esModule", { value: !0 }),
              (t.MultiLangChatComponent = void 0);
            var r = n(7496),
              a = n(6166),
              s = n(1389),
              c = n(5949),
              l = n(8656),
              p = n(4534),
              h = (function () {
                function e(e, t) {
                  var n,
                    s,
                    l = this;
                  if (
                    ((this.config = t),
                    (this.isFirstConnection = !0),
                    (this.isWidgetOpen = !1),
                    (this.isTTSEnabled = !0),
                    (this.isVoiceEnabled = !0),
                    (this.renderAsListItem = !1),
                    (this.recognitionLocaleMap = {}),
                    (this.synthesisLocaleVoiceMap = {}),
                    (this.supportedLangList = []),
                    (this.core = t.webCore),
                    (this.settings = t.settings),
                    (this.localizedText =
                      this.settings.i18n[this.settings.locale]),
                    (this.cssPrefix = t.settings.name),
                    e &&
                      ((this.langOptions = o(o({}, e), {
                        supportedLangs: i([], e.supportedLangs, !0),
                      })),
                      (n = this.langOptions.supportedLangs),
                      "string" == typeof (s = this.langOptions.primary) &&
                        (this.langOptions.primary = s.toLowerCase())),
                    n && n.length)
                  )
                    if (
                      (n.forEach(function (e) {
                        e.lang = e.lang.toLowerCase();
                      }),
                      n.length > 1
                        ? (n.unshift({
                            lang: "und",
                            label: this.localizedText.language_detect,
                          }),
                          this.langOptions.primary ||
                            (this.langOptions.primary = null))
                        : (this.langOptions.primary = n[0].lang),
                      (this.supportedLangList = n.map(function (e) {
                        return e.lang;
                      })),
                      this.settings.enableBotAudioResponse)
                    ) {
                      var p = t.synthesisVoices;
                      if (p && p.length) {
                        var h = {};
                        n.forEach(function (e) {
                          var t = p.find(function (t) {
                            return t.lang.indexOf(e.lang) >= 0;
                          });
                          t && (h[e.lang] = t);
                        }),
                          (this.synthesisLocaleVoiceMap = h);
                      }
                    } else this.updateSynthesis = function () {};
                  if (this.settings.enableSpeech) {
                    var u = {};
                    (0, c.getValues)(a.RecognitionLocale).forEach(function (e) {
                      (u[e.substring(0, 2)] = e), (u[e] = e);
                    }),
                      d(a.RecognitionLocale.EN_GB, u),
                      d(a.RecognitionLocale.EN_AU, u),
                      d(a.RecognitionLocale.EN_IN, u),
                      (this.recognitionLocaleMap = u);
                  } else this.updateRecognition = function () {};
                  this.core.on(a.CoreEvent.State, function (e) {
                    e !== a.ConnectionState.Open && l.disableComponent(!0);
                  }),
                    this.core.on(a.CoreEvent.Open, function () {
                      l.disableComponent(!1),
                        l.isFirstConnection
                          ? l.initLanguage()
                          : void 0 !== l.currentTag && l.setTag(l.currentTag);
                    }),
                    (this.settings.initMessageOptions &&
                      "expand" !== this.settings.initMessageOptions.sendAt) ||
                    this.settings.openChatOnLoad ||
                    this.settings.embedded
                      ? (this.isWidgetOpen = !0)
                      : t.chatWidget.on(r.ChatEvent.WIDGET_OPENED, function () {
                          l.isWidgetOpen ||
                            ((l.isWidgetOpen = !0),
                            l.core.isConnected() && l.initLanguage());
                        });
                }
                return (
                  (e.prototype.render = function (e) {
                    var t,
                      n = this,
                      o = this.config.util,
                      i = this.cssPrefix,
                      r = "language-selection",
                      a = "".concat(i, "-").concat(r, "-button"),
                      c = "".concat(i, "-").concat(r, "-menu"),
                      l = this.langOptions;
                    if (
                      ((this.renderAsListItem = e),
                      !(l && l.supportedLangs && l.supportedLangs.length >= 2))
                    )
                      return null;
                    if (!this.component) {
                      var p = this.settings.icons.language || s.iconLanguage,
                        h = void 0,
                        u = l.supportedLangs.map(function (e) {
                          var t = e.label,
                            i = e.lang;
                          return o.createListItem(
                            "".concat(r, "-option-").concat(i),
                            t,
                            i,
                            "",
                            "".concat(r, "-option"),
                            function (e) {
                              var t = e.target;
                              "LI" !== t.tagName && (t = t.parentElement);
                              var o = t.dataset.value;
                              n.selectLanguage(o);
                            }
                          );
                        }),
                        d = o.getMenu({
                          menuId: c,
                          menuClassList: ["".concat(r, "-menu")],
                          menuItems: u,
                          buttonId: a,
                          menuButton: h,
                        });
                      if (e) {
                        var g = o.createListItem(
                          "action-menu-option-lang",
                          this.localizedText.languageSelectDropdown,
                          "lang",
                          p,
                          "action-item",
                          null,
                          !0
                        );
                        t = o.getMenuButton({ button: g, menuId: c, menu: d });
                        var f = o.createDiv(["arrow-icon"]),
                          m = o.createImageIcon({
                            icon: s.iconExpandArrow,
                            title: "",
                          });
                        f.appendChild(m),
                          t.appendChild(f),
                          this.config.chatWidget.chatWidgetDiv.appendChild(d);
                      } else {
                        (t = o.createDiv()),
                          (h = o.createIconButton({
                            css: ["header-button", "button-lang"],
                            icon: p,
                            iconCss: ["header-button-icon"],
                            title: this.localizedText.languageSelectDropdown,
                          }));
                        var v = o.getMenuButton({
                          button: h,
                          menuId: c,
                          menu: d,
                        });
                        t.appendChild(v), t.appendChild(d), (h.id = a);
                      }
                      this.disableComponent(!1);
                    }
                    return (this.component = t), t;
                  }),
                  (e.prototype.setLocale = function (e) {
                    this.langOptions.supportedLangs.forEach(function (t) {
                      var n = t.lang,
                        o = document.getElementById(
                          "language-selection-option-".concat(n)
                        ),
                        i = o.querySelector("span"),
                        r =
                          e["language_".concat("und" === n ? "detect" : n)] ||
                          t.label ||
                          t.lang;
                      (o.title = r), (i.innerText = r);
                    });
                  }),
                  (e.prototype.setTag = function (e, t) {
                    void 0 === t && (t = !0),
                      null !== e && (e = e.toLowerCase()),
                      this.supportedLangList.length &&
                        (e = this.supportedLangList.indexOf(e) >= 0 ? e : null),
                      this.selectLanguage(e, t);
                  }),
                  (e.prototype.selectLanguage = function (e, t) {
                    void 0 === t && (t = !0),
                      (this.localizedText = this.settings.i18n[e]),
                      this.component && this.updateActiveLocale(e),
                      "und" === e && (e = null),
                      t &&
                        (this.updateProfile(e),
                        this.config.storageService.setItem(
                          u(this.settings),
                          e
                        )),
                      this.updateSynthesis(e),
                      this.updateRecognition(e),
                      this.config.chatWidget.onLanguageUpdate(e, t),
                      this.currentTag !== e &&
                        ((this.currentTag = e),
                        this.config.eventDispatcher.trigger(
                          r.ChatEvent.CHAT_LANG,
                          e
                        ));
                  }),
                  (e.prototype.updateProfile = function (e) {
                    if (this.core.isConnected()) {
                      var t = { profile: { languageTag: e } };
                      e || (t.profile.locale = e),
                        this.core.updateUser(t, {
                          sdkMetadata: { version: p.SDK_VERSION },
                        });
                    }
                  }),
                  (e.prototype.updateSynthesis = function (e) {
                    var t = this.config.chatWidget;
                    if (e) {
                      if (
                        (this.isTTSEnabled ||
                          (t.enableSpeechSynthesisService(!0),
                          (this.isTTSEnabled = !0)),
                        this.settings.enableBotAudioResponse)
                      ) {
                        var n = this.synthesisLocaleVoiceMap[e] || { lang: e };
                        this.core.setTTSVoice([n]);
                      }
                    } else
                      (this.isTTSEnabled = !1),
                        this.settings.enableBotAudioResponse &&
                          this.core.cancelTTS(),
                        t.enableSpeechSynthesisService(!1);
                  }),
                  (e.prototype.updateRecognition = function (e) {
                    var t = this.config,
                      n = this.recognitionLocaleMap[e],
                      o = t.chatWidget;
                    n
                      ? (this.isVoiceEnabled ||
                          (o.setVoiceRecognitionService(!0),
                          (this.isVoiceEnabled = !0)),
                        this.core.setRecognitionLocale(n))
                      : ((this.isVoiceEnabled = !1),
                        this.core.stopRecognition(),
                        this.core.setRecognitionLocale(null),
                        o.setVoiceRecognitionService(!1));
                  }),
                  (e.prototype.disableComponent = function (e) {
                    if (this.component) {
                      var t = this.config.util,
                        n = this.component;
                      if (this.renderAsListItem) {
                        var o = "disable";
                        e ? t.addCSSClass(n, o) : t.removeCSSClass(n, o);
                      } else n.querySelector("button").disabled = e;
                    }
                  }),
                  (e.prototype.updateActiveLocale = function (e) {
                    var t = this.config.util,
                      n = e || "und",
                      o = document.getElementById(
                        "".concat(this.cssPrefix, "-language-selection-menu")
                      ),
                      i = "active";
                    if (o) {
                      var r = o.querySelector(
                        "li.".concat(this.cssPrefix, "-").concat(i)
                      );
                      r && t.removeCSSClass(r, i);
                      var a = o.querySelector('[data-value="'.concat(n, '"]'));
                      a && t.addCSSClass(a, i);
                    }
                  }),
                  (e.prototype.initLanguage = function () {
                    var e = this.langOptions || {},
                      t = e.supportedLangs,
                      n = e.primary;
                    if (this.isFirstConnection && this.isWidgetOpen) {
                      if (t && t.length) {
                        var o = this.config.storageService.getItem(
                          u(this.settings)
                        );
                        o && (n = "null" === o ? null : o);
                      }
                      void 0 !== n && this.setTag(n),
                        (this.isFirstConnection = !1);
                    }
                  }),
                  e
                );
              })();
            function u(e) {
              return ""
                .concat(e.name, "-")
                .concat(e.channelId, "-")
                .concat(e.userId);
            }
            function d(e, t) {
              (0, l.getBrowserLocale)() === e && (t[e.substring(0, 2)] = e);
            }
            t.MultiLangChatComponent = h;
          },
          2365: function (e, t) {
            Object.defineProperty(t, "__esModule", { value: !0 }),
              (t.Component = void 0);
            var n = (function () {
              function e() {}
              return (
                (e.prototype.remove = function () {
                  this.element.remove();
                }),
                (e.prototype.appendToElement = function (e) {
                  e.appendChild(this.element);
                }),
                (e.prototype.prependToElement = function (e) {
                  var t = e.firstChild;
                  t
                    ? e.insertBefore(this.element, t)
                    : e.appendChild(this.element);
                }),
                (e.prototype.appendContentChildElement = function (e) {
                  this._getContentElement().appendChild(e);
                }),
                (e.prototype.appendContentChild = function (e) {
                  this._getContentElement().appendChild(e.element);
                }),
                (e.prototype._getContentElement = function () {
                  return this.element;
                }),
                e
              );
            })();
            t.Component = n;
          },
          6137: function (e, t, n) {
            Object.defineProperty(t, "__esModule", { value: !0 }),
              (t.defaultSettings = void 0);
            var o = n(6166),
              i = n(1001),
              r = "Please try sharing it again, or else type it in.";
            t.defaultSettings = {
              badgePosition: { right: "-5px", top: "-5px" },
              clientAuthEnabled: !1,
              conversationBeginPosition: "bottom",
              disablePastActions: "all",
              displayActionsAsPills: !1,
              embedded: !1,
              embeddedVideo: !0,
              enableAttachment: !0,
              enableAttachmentSecurity: !1,
              enableHeaderActionCollapse: !0,
              enableAutocomplete: !1,
              enableAutocompleteClientCache: !1,
              enableBotAudioResponse: !1,
              enableDefaultClientResponse: !1,
              enableClearMessage: !1,
              enableEndConversation: !0,
              enableHeadless: !1,
              enableLocalConversationHistory: !1,
              enableLongPolling: !1,
              enableSecureConnection: !0,
              enableSpeech: !1,
              enableSpeechAutoSend: !0,
              enableTabsSync: !0,
              enableTimestamp: !0,
              focusOnNewMessage: "input",
              font: '16px "Helvetica Neue", Helvetica, Arial, sans-serif',
              fontFamily:
                '"Oracle Sans", "Helvetica Neue", Helvetica, Arial, sans-serif',
              height: "620px",
              i18n: {
                en: {
                  attachment_audio: "Audio attachment",
                  attachment_file: "File attachment",
                  attachment_image: "Image attachment",
                  attachment_video: "Video attachment",
                  attachmentAudioFallback:
                    "Your browser does not support embedded audio. However you can {0}download it{/0}.",
                  attachmentVideoFallback:
                    "Your browser does not support embedded video. However you can {0}download it{/0}.",
                  audioResponseOff: "Turn audio response on",
                  audioResponseOn: "Turn audio response off",
                  card: "Card {0}",
                  cardImagePlaceholder: "Card image",
                  cardNavNext: "Next card",
                  cardNavPrevious: "Previous card",
                  chatTitle: "Chat",
                  clear: "Clear conversation",
                  close: "Close widget",
                  closing: "Closing",
                  connected: "Connected",
                  connecting: "Connecting",
                  defaultGreetingMessage:
                    "Hey, Nice to meet you! Allow me a moment to get back to you.",
                  defaultWaitMessage:
                    "I'm still working on your request. Thank you for your patience!",
                  defaultSorryMessage:
                    "I'm sorry. I can't get you the right content. Please try again.",
                  disconnected: "Disconnected",
                  download: "Download",
                  endConversation: "End Conversation",
                  endConversationConfirmMessage:
                    "Are you sure you want to end the conversation?",
                  endConversationDescription:
                    "This will also clear your conversation history.",
                  errorSpeechInvalidUrl:
                    "ODA URL for connection is not set. Please pass 'URI' parameter during SDK initialization.",
                  errorSpeechMultipleConnection:
                    "Another voice recognition is ongoing. Can't start a new one.",
                  errorSpeechTooMuchTimeout:
                    "The voice message is too long to recognize and generate text.",
                  errorSpeechUnavailable:
                    "To allow voice messaging, update your browser settings to enable access to your microphone.",
                  errorSpeechUnsupportedLocale:
                    "The locale set for voice recognition is not supported. Please use a valid locale in 'speechLocale' setting.",
                  inputPlaceholder: "Type a message",
                  imageViewerClose: "Close image viewer",
                  imageViewerOpen: "Open image viewer",
                  itemIterator: "Item {0}",
                  language_ar: "Arabic",
                  language_de: "German",
                  language_detect: "Detect Language",
                  language_en: "English",
                  language_hi: "Hindi",
                  language_es: "Spanish",
                  language_fr: "French",
                  language_it: "Italian",
                  language_nl: "Dutch",
                  language_pt: "Portuguese",
                  languageSelectDropdown: "Select chat language",
                  linkField:
                    "Click on the highlighted text to open Link for {0}",
                  noSpeechTimeout:
                    "The voice could not be detected to perform recognition.",
                  noText: "No",
                  openMap: "Open Map",
                  previousChats: "End of previous conversation",
                  ratingStar: "Rate {0} star",
                  recognitionTextPlaceholder: "Speak your message",
                  relTimeDay: "{0}d ago",
                  relTimeHr: "{0}hr ago",
                  relTimeMin: "{0}min ago",
                  relTimeMoment: "A few seconds ago",
                  relTimeMon: "{0}mth ago",
                  relTimeNow: "Now",
                  relTimeYr: "{0}yr ago",
                  requestLocation: "Requesting location",
                  requestLocationDeniedPermission:
                    "To allow sharing your location, update your browser settings to enable access to your location. You can also type in the location instead.",
                  requestLocationDeniedTimeout:
                    "It is taking too long to get your location. ".concat(r),
                  requestLocationDeniedUnavailable:
                    "Your current location is unavailable. ".concat(r),
                  retryMessage: "Try again",
                  send: "Send message",
                  shareAudio: "Share Audio",
                  shareFailureMessage:
                    "Sorry, sharing is not available on this device.",
                  shareFile: "Share File",
                  shareLocation: "Share Location",
                  shareVisual: "Share Image/Video",
                  skillMessage: "Skill says",
                  showOptions: "Show Options",
                  speak: "Speak a message",
                  typingIndicator: "Waiting for response",
                  upload: "Share popup",
                  uploadFailed: "Upload Failed.",
                  uploadFileSizeLimitExceeded:
                    "File size should not be more than {0}MB.",
                  uploadFileSizeZeroByte:
                    "Files of size zero bytes can't be uploaded.",
                  uploadUnsupportedFileType: "Unsupported file type.",
                  userMessage: "I say",
                  utteranceGeneric: "Message from skill.",
                  webViewAccessibilityTitle:
                    "In-widget WebView to display links",
                  webViewClose: "Done",
                  webViewErrorInfoDismiss: "Dismiss",
                  webViewErrorInfoText:
                    "Don’t see the page? {0}Click here{/0} to open it in a browser.",
                  yesText: "Yes",
                },
              },
              initBotAudioMuted: !0,
              isDebugMode: !1,
              locale: "en",
              messageCacheSizeLimit: 2e3,
              name: "oda-chat",
              openChatOnLoad: !1,
              openLinksInNewWindow: !1,
              readMark: "✓",
              reconnectInterval: 5,
              reconnectMaxAttempts: 50,
              reconnectTimeout: 300,
              shareMenuItems: [
                i.ShareCategory.AUDIO,
                i.ShareCategory.FILE,
                i.ShareCategory.LOCATION,
                i.ShareCategory.VISUAL,
              ],
              showConnectionStatus: !1,
              showPrevConvStatus: !0,
              showTypingIndicator: !0,
              speechLocale: o.RecognitionLocale.EN_US,
              theme: i.IWidgetTheme.DEFAULT,
              timestampMode: "default",
              defaultGreetingTimeout: 5,
              defaultWaitMessageInterval: 5,
              typingIndicatorTimeout: 30,
              upgradeToWebSocketInterval: 300,
              webViewConfig: {},
              width: "375px",
            };
          },
          2226: function (e, t, n) {
            Object.defineProperty(t, "__esModule", { value: !0 }),
              (t.ActionComponentFactory = void 0);
            var o = n(6166),
              i = n(9315),
              r = n(4910),
              a = n(6848),
              s = n(4254),
              c = n(1349),
              l = n(8798),
              p = (function () {
                function e() {}
                return (
                  (e.fromActionPayload = function (t, n, l, p, h, u) {
                    switch (t.type) {
                      case o.ActionType.Postback:
                        return new a.PostbackActionComponent(n, t);
                      case o.ActionType.Url:
                        return new c.UrlActionComponent(n, t, l, h);
                      case o.ActionType.Webview:
                        return new c.UrlActionComponent(
                          n,
                          t,
                          l,
                          u.webviewLinkHandler
                        );
                      case o.ActionType.Location:
                        return new r.LocationActionComponent(n, t);
                      case o.ActionType.Call:
                        return new i.CallActionComponent(n, t);
                      case o.ActionType.Share:
                        return new s.ShareActionComponent(n, t, p);
                      default:
                        return (
                          e.logger.error(
                            "Payload contains wrong action type:".concat(t.type)
                          ),
                          null
                        );
                    }
                  }),
                  (e.logger = new l.Logger("ActionComponentFactory")),
                  e
                );
              })();
            t.ActionComponentFactory = p;
          },
          2304: function (e, t, n) {
            Object.defineProperty(t, "__esModule", { value: !0 }),
              (t.MessageComponentFactory = void 0);
            var o = n(986),
              i = n(8954),
              r = n(8215),
              a = n(3145),
              s = n(6790),
              c = n(523),
              l = n(1597),
              p = n(3353),
              h = n(3538),
              u = n(3357),
              d = n(6166),
              g = n(9978),
              f = (function () {
                function e() {}
                return (
                  (e.fromMessage = function (e, t, n, f, m) {
                    var v, b;
                    (0, g.isBotMessage)(n)
                      ? ((v = a.MESSAGE_SIDE.LEFT),
                        (b = n.source || d.SkillMessageSource.Bot))
                      : ((v = a.MESSAGE_SIDE.RIGHT),
                        n.messagePayload.type === d.MessageType.Postback &&
                          (n = (0, d.buildUserMessage)({
                            text: n.messagePayload.text,
                            type: d.MessageType.Text,
                          })));
                    var w = n.messagePayload;
                    switch (w.type) {
                      case d.MessageType.Text:
                        return w.channelExtensions &&
                          "stars" === w.channelExtensions.displayType
                          ? new l.FeedbackComponent(e, t, w, v, f, b, m)
                          : new c.TextMessageComponent(e, t, w, v, f, b, m);
                      case d.MessageType.Attachment:
                        return new o.AttachmentMessageComponent(
                          e,
                          t,
                          w,
                          v,
                          f,
                          b,
                          m
                        );
                      case d.MessageType.Card:
                        return new i.CardMessageComponent(e, t, w, v, f, b, m);
                      case d.MessageType.Location:
                        return new r.LocationMessageComponent(
                          e,
                          t,
                          w,
                          v,
                          f,
                          b,
                          m
                        );
                      case d.MessageType.Table:
                        return new u.TableMessageComponent(e, t, w, v, f, b, m);
                      case d.MessageType.Form:
                        return new p.FormMessageComponent(e, t, w, v, f, b, m);
                      case d.MessageType.TableForm:
                        return new h.TableFormMessageComponent(
                          e,
                          t,
                          w,
                          v,
                          f,
                          b,
                          m
                        );
                      case d.MessageType.Raw:
                        return new s.RawMessageComponent(e, t, w, v, f, b, m);
                      default:
                        throw Error(
                          "Wrong message payload type:".concat(w.type)
                        );
                    }
                  }),
                  e
                );
              })();
            t.MessageComponentFactory = f;
          },
          8798: function (e, t) {
            Object.defineProperty(t, "__esModule", { value: !0 }),
              (t.Logger = void 0);
            var n = (function () {
              function e(e) {
                this.module = e;
              }
              return (
                (e.prototype.debug = function () {
                  for (var t = [], n = 0; n < arguments.length; n++)
                    t[n] = arguments[n];
                  this._log(e.LOG_LEVEL.DEBUG, t);
                }),
                (e.prototype.error = function () {
                  for (var t = [], n = 0; n < arguments.length; n++)
                    t[n] = arguments[n];
                  this._log(e.LOG_LEVEL.ERROR, t);
                }),
                (e.prototype.info = function () {
                  for (var t = [], n = 0; n < arguments.length; n++)
                    t[n] = arguments[n];
                  this._log(e.LOG_LEVEL.INFO, t);
                }),
                (e.prototype.warn = function () {
                  for (var t = [], n = 0; n < arguments.length; n++)
                    t[n] = arguments[n];
                  this._log(e.LOG_LEVEL.WARN, t);
                }),
                (e.prototype._log = function (t, n) {
                  if (e.logLevel >= t) {
                    n.unshift(
                      "[" +
                        e.appName +
                        "." +
                        e.appVersion +
                        "." +
                        this.module +
                        "]"
                    );
                    var o = void 0;
                    switch (e.logLevel) {
                      case e.LOG_LEVEL.ERROR:
                        o = console.error;
                        break;
                      case e.LOG_LEVEL.WARN:
                        o = console.warn;
                        break;
                      case e.LOG_LEVEL.INFO:
                        o = console.info;
                        break;
                      case e.LOG_LEVEL.DEBUG:
                        o = console.debug;
                    }
                    e.historyEnabled &&
                      (e.history.push(Object.assign({}, n, { level: t })),
                      e._historySize <= e.history.length && e.history.shift()),
                      o.apply(console, n);
                  }
                }),
                (e.LOG_LEVEL = {
                  DEBUG: 4,
                  ERROR: 1,
                  INFO: 3,
                  NONE: 0,
                  WARN: 2,
                }),
                (e.logLevel = e.LOG_LEVEL.ERROR),
                (e.history = []),
                (e.historyEnabled = !1),
                (e._historySize = 100),
                e
              );
            })();
            t.Logger = n;
          },
          9978: function (e, t, n) {
            Object.defineProperty(t, "__esModule", { value: !0 }),
              (t.getMessageDigest = t.isBotMessage = void 0);
            var o = n(6166);
            (t.isBotMessage = function (e) {
              return !!e.source;
            }),
              (t.getMessageDigest = function (e) {
                if (e.msgId) return e.msgId;
                var t = e.messagePayload,
                  n = t.type;
                switch (t.type) {
                  case o.MessageType.Text:
                    n = "".concat(n).concat(t.text.substring(0, 10));
                    break;
                  case o.MessageType.Card:
                    n = "".concat(n).concat(t.cards[0].title.substring(0, 10));
                    break;
                  case o.MessageType.Attachment:
                    n = "".concat(n).concat(t.attachment.url.substring(0, 20));
                    break;
                  case o.MessageType.Location:
                    var i = t.location;
                    n = "".concat(n).concat(i.latitude).concat(i.latitude);
                }
                return n;
              });
          },
          1001: function (e, t) {
            var n, o, i;
            Object.defineProperty(t, "__esModule", { value: !0 }),
              (t.ShareCategory = t.StorageType = t.IWidgetTheme = void 0),
              (function (e) {
                (e.SESSION = "sessionStorage"), (e.LOCAL = "localStorage");
              })(n || (n = {})),
              (t.StorageType = n),
              (function (e) {
                (e.CLASSIC = "classic"),
                  (e.DEFAULT = "default"),
                  (e.REDWOOD_DARK = "redwood-dark");
              })(o || (o = {})),
              (t.IWidgetTheme = o),
              (function (e) {
                (e.AUDIO = "audio"),
                  (e.FILE = "file"),
                  (e.LOCATION = "location"),
                  (e.VISUAL = "visual");
              })(i || (i = {})),
              (t.ShareCategory = i);
          },
          2601: function (e, t, n) {
            Object.defineProperty(t, "__esModule", { value: !0 }),
              (t.StorageService = void 0);
            var o = n(8656),
              i = function (e) {
                var t = this;
                (this.getItem = function (e) {
                  return (
                    !t.cache[e] &&
                      t.isStorage &&
                      (t.cache[e] = t.storage.getItem(e)),
                    t.cache[e]
                  );
                }),
                  (this.setItem = function (e, n) {
                    t.isStorage
                      ? (t.storage.setItem(e, n), delete t.cache[e])
                      : (t.cache[e] = n);
                  }),
                  (this.removeItem = function (e) {
                    t.isStorage && t.storage.removeItem(e), delete t.cache[e];
                  }),
                  (this.cache = {}),
                  (0, o.isStorageAvailable)(e)
                    ? ((this.isStorage = !0), (this.storage = window[e]))
                    : (this.isStorage = !1);
              };
            t.StorageService = i;
          },
          5439: function (e, t, n) {
            Object.defineProperty(t, "__esModule", { value: !0 }),
              (t.ActionComponent = void 0);
            var o = n(6166),
              i = (function () {
                function e(e, t) {
                  (this.util = e),
                    (this._disabled = !1),
                    (this._type = t.type),
                    (this._label = t.label),
                    (this._imageUrl = t.imageUrl);
                }
                return (
                  (e.prototype.render = function () {
                    var e = this.util;
                    if (
                      ((this._htmlElement = e.createButton([
                        "action-postback",
                      ])),
                      (this._htmlElement.onclick =
                        this.handleOnClick.bind(this)),
                      this._imageUrl)
                    ) {
                      var t = e.createImage(
                        this._imageUrl,
                        ["action-image"],
                        this._label || ""
                      );
                      this._htmlElement.appendChild(t);
                    }
                    if (this._label) {
                      var n = e.linkify(this._label, { emHTML: !0 }),
                        o = e.createDiv();
                      (o.innerHTML = n),
                        this._htmlElement.appendChild(o),
                        (this._htmlElement.title =
                          this._htmlElement.textContent);
                    }
                    return (
                      this._disabled &&
                        e.addCSSClass(this._htmlElement, "disabled"),
                      this._htmlElement
                    );
                  }),
                  (e.prototype.handleOnClick = function (e) {
                    if (this.onActionClick && !this._disabled) {
                      var t = {
                        getPayload: this.getEventPayload.bind(this),
                        label: this._label,
                        type: this._type,
                      };
                      this.onActionClick(t);
                    }
                    (this._type !== o.ActionType.Postback &&
                      this._type !== o.ActionType.Location &&
                      this._type !== o.ActionType.Share) ||
                      (e.preventDefault(), e.stopPropagation());
                  }),
                  (e.prototype.disable = function () {
                    (this._disabled = !0),
                      this._htmlElement &&
                        (this.util.addCSSClass(this._htmlElement, "disabled"),
                        (this._htmlElement.disabled = !0));
                  }),
                  (e.prototype.enable = function () {
                    (this._disabled = !1),
                      this._htmlElement &&
                        (this.util.removeCSSClass(
                          this._htmlElement,
                          "disabled"
                        ),
                        (this._htmlElement.disabled = !1));
                  }),
                  (e.prototype.getActionType = function () {
                    return this._type;
                  }),
                  e
                );
              })();
            t.ActionComponent = i;
          },
          9315: function (e, t, n) {
            var o,
              i =
                (this && this.__extends) ||
                ((o = function (e, t) {
                  return (o =
                    Object.setPrototypeOf ||
                    ({ __proto__: [] } instanceof Array &&
                      function (e, t) {
                        e.__proto__ = t;
                      }) ||
                    function (e, t) {
                      for (var n in t)
                        Object.prototype.hasOwnProperty.call(t, n) &&
                          (e[n] = t[n]);
                    })(e, t);
                }),
                function (e, t) {
                  if ("function" != typeof t && null !== t)
                    throw new TypeError(
                      "Class extends value " +
                        String(t) +
                        " is not a constructor or null"
                    );
                  function n() {
                    this.constructor = e;
                  }
                  o(e, t),
                    (e.prototype =
                      null === t
                        ? Object.create(t)
                        : ((n.prototype = t.prototype), new n()));
                });
            Object.defineProperty(t, "__esModule", { value: !0 }),
              (t.CallActionComponent = void 0);
            var r = n(9297),
              a = (function (e) {
                function t(t, n) {
                  var o = e.call(this, t, n) || this;
                  return (o._phoneNumber = n.phoneNumber), o;
                }
                return (
                  i(t, e),
                  (t.prototype.render = function () {
                    var t = this.util,
                      n = e.prototype.render.call(this);
                    t.addCSSClass(n, "action-call");
                    var o = t.createAnchor(
                      "tel:".concat(this._phoneNumber),
                      ""
                    );
                    return (
                      (this.onActionClick = function () {
                        o.click();
                      }),
                      n
                    );
                  }),
                  (t.prototype.getEventPayload = function () {
                    return r.default.resolve(this._phoneNumber);
                  }),
                  t
                );
              })(n(5439).ActionComponent);
            t.CallActionComponent = a;
          },
          4910: function (e, t, n) {
            var o,
              i =
                (this && this.__extends) ||
                ((o = function (e, t) {
                  return (o =
                    Object.setPrototypeOf ||
                    ({ __proto__: [] } instanceof Array &&
                      function (e, t) {
                        e.__proto__ = t;
                      }) ||
                    function (e, t) {
                      for (var n in t)
                        Object.prototype.hasOwnProperty.call(t, n) &&
                          (e[n] = t[n]);
                    })(e, t);
                }),
                function (e, t) {
                  if ("function" != typeof t && null !== t)
                    throw new TypeError(
                      "Class extends value " +
                        String(t) +
                        " is not a constructor or null"
                    );
                  function n() {
                    this.constructor = e;
                  }
                  o(e, t),
                    (e.prototype =
                      null === t
                        ? Object.create(t)
                        : ((n.prototype = t.prototype), new n()));
                });
            Object.defineProperty(t, "__esModule", { value: !0 }),
              (t.LocationActionComponent = void 0);
            var r = n(9297),
              a = (function (e) {
                function t() {
                  return (null !== e && e.apply(this, arguments)) || this;
                }
                return (
                  i(t, e),
                  (t.prototype.render = function () {
                    var t = this.util,
                      n = e.prototype.render.call(this);
                    return t.addCSSClass(n, "action-location"), n;
                  }),
                  (t.prototype.getEventPayload = function () {
                    return this.getCurrentPosition();
                  }),
                  (t.prototype.getCurrentPosition = function () {
                    return new r.default(function (e, t) {
                      setTimeout(function () {
                        navigator.geolocation.getCurrentPosition(
                          function (t) {
                            e({
                              latitude: t.coords.latitude,
                              longitude: t.coords.longitude,
                            });
                          },
                          function (e) {
                            t(e);
                          }
                        );
                      });
                    });
                  }),
                  t
                );
              })(n(5439).ActionComponent);
            t.LocationActionComponent = a;
          },
          6848: function (e, t, n) {
            var o,
              i =
                (this && this.__extends) ||
                ((o = function (e, t) {
                  return (o =
                    Object.setPrototypeOf ||
                    ({ __proto__: [] } instanceof Array &&
                      function (e, t) {
                        e.__proto__ = t;
                      }) ||
                    function (e, t) {
                      for (var n in t)
                        Object.prototype.hasOwnProperty.call(t, n) &&
                          (e[n] = t[n]);
                    })(e, t);
                }),
                function (e, t) {
                  if ("function" != typeof t && null !== t)
                    throw new TypeError(
                      "Class extends value " +
                        String(t) +
                        " is not a constructor or null"
                    );
                  function n() {
                    this.constructor = e;
                  }
                  o(e, t),
                    (e.prototype =
                      null === t
                        ? Object.create(t)
                        : ((n.prototype = t.prototype), new n()));
                });
            Object.defineProperty(t, "__esModule", { value: !0 }),
              (t.PostbackActionComponent = void 0);
            var r = n(9297),
              a = (function (e) {
                function t(t, n) {
                  var o = e.call(this, t, n) || this;
                  return (o._postback = n.postback), o;
                }
                return (
                  i(t, e),
                  (t.prototype.getEventPayload = function () {
                    return r.default.resolve(this._postback);
                  }),
                  t
                );
              })(n(5439).ActionComponent);
            t.PostbackActionComponent = a;
          },
          4254: function (e, t, n) {
            var o,
              i =
                (this && this.__extends) ||
                ((o = function (e, t) {
                  return (o =
                    Object.setPrototypeOf ||
                    ({ __proto__: [] } instanceof Array &&
                      function (e, t) {
                        e.__proto__ = t;
                      }) ||
                    function (e, t) {
                      for (var n in t)
                        Object.prototype.hasOwnProperty.call(t, n) &&
                          (e[n] = t[n]);
                    })(e, t);
                }),
                function (e, t) {
                  if ("function" != typeof t && null !== t)
                    throw new TypeError(
                      "Class extends value " +
                        String(t) +
                        " is not a constructor or null"
                    );
                  function n() {
                    this.constructor = e;
                  }
                  o(e, t),
                    (e.prototype =
                      null === t
                        ? Object.create(t)
                        : ((n.prototype = t.prototype), new n()));
                });
            Object.defineProperty(t, "__esModule", { value: !0 }),
              (t.ShareActionComponent = void 0);
            var r = n(9297),
              a = (function (e) {
                function t(t, n, o) {
                  var i = e.call(this, t, n) || this;
                  return (i.shareText = o), i;
                }
                return (
                  i(t, e),
                  (t.prototype.render = function () {
                    var t = this.util,
                      n = e.prototype.render.call(this);
                    return t.addCSSClass(n, "action-share"), n;
                  }),
                  (t.prototype.getEventPayload = function () {
                    return r.default.resolve(this.shareText);
                  }),
                  t
                );
              })(n(5439).ActionComponent);
            t.ShareActionComponent = a;
          },
          1349: function (e, t, n) {
            var o,
              i =
                (this && this.__extends) ||
                ((o = function (e, t) {
                  return (o =
                    Object.setPrototypeOf ||
                    ({ __proto__: [] } instanceof Array &&
                      function (e, t) {
                        e.__proto__ = t;
                      }) ||
                    function (e, t) {
                      for (var n in t)
                        Object.prototype.hasOwnProperty.call(t, n) &&
                          (e[n] = t[n]);
                    })(e, t);
                }),
                function (e, t) {
                  if ("function" != typeof t && null !== t)
                    throw new TypeError(
                      "Class extends value " +
                        String(t) +
                        " is not a constructor or null"
                    );
                  function n() {
                    this.constructor = e;
                  }
                  o(e, t),
                    (e.prototype =
                      null === t
                        ? Object.create(t)
                        : ((n.prototype = t.prototype), new n()));
                });
            Object.defineProperty(t, "__esModule", { value: !0 }),
              (t.UrlActionComponent = void 0);
            var r = n(9297),
              a = (function (e) {
                function t(t, n, o, i) {
                  void 0 === o && (o = !1);
                  var r = e.call(this, t, n) || this;
                  return (
                    (r._openInWindow = o),
                    (r._linkHandler = i),
                    (r._url = n.url),
                    r
                  );
                }
                return (
                  i(t, e),
                  (t.prototype.render = function () {
                    var t = this.util,
                      n = e.prototype.render.call(this);
                    if ((t.addCSSClass(n, "action-url"), this._url)) {
                      var o = t.createAnchor(
                        this._url,
                        "",
                        [],
                        this._openInWindow,
                        this._linkHandler
                      );
                      n.onclick = function () {
                        o.click();
                      };
                    }
                    return n;
                  }),
                  (t.prototype.getEventPayload = function () {
                    return r.default.resolve(this._url);
                  }),
                  t
                );
              })(n(5439).ActionComponent);
            t.UrlActionComponent = a;
          },
          986: function (e, t, n) {
            var o,
              i =
                (this && this.__extends) ||
                ((o = function (e, t) {
                  return (o =
                    Object.setPrototypeOf ||
                    ({ __proto__: [] } instanceof Array &&
                      function (e, t) {
                        e.__proto__ = t;
                      }) ||
                    function (e, t) {
                      for (var n in t)
                        Object.prototype.hasOwnProperty.call(t, n) &&
                          (e[n] = t[n]);
                    })(e, t);
                }),
                function (e, t) {
                  if ("function" != typeof t && null !== t)
                    throw new TypeError(
                      "Class extends value " +
                        String(t) +
                        " is not a constructor or null"
                    );
                  function n() {
                    this.constructor = e;
                  }
                  o(e, t),
                    (e.prototype =
                      null === t
                        ? Object.create(t)
                        : ((n.prototype = t.prototype), new n()));
                });
            Object.defineProperty(t, "__esModule", { value: !0 }),
              (t.AttachmentMessageComponent = void 0);
            var r = n(2714),
              a = n(6086),
              s = n(2406),
              c = n(8175),
              l = n(3145),
              p = n(6166),
              h = (function (e) {
                function t(n, o, i, r, a, s, c) {
                  var l = e.call(this, n, o, i, r, a, s, c) || this;
                  return (
                    (l._attachment = t.fromPayload(
                      n,
                      o,
                      i.attachment,
                      r,
                      c,
                      l.hasActions()
                    )),
                    l
                  );
                }
                return (
                  i(t, e),
                  (t.fromPayload = function (e, t, n, o, i, l) {
                    if (
                      (void 0 === l && (l = !1),
                      i &&
                        i.authToken &&
                        i.uri &&
                        n.url.indexOf(i.uri) >= 0 &&
                        !this.tokenRegex.test(n.url))
                    ) {
                      var h = null == i ? void 0 : i.authToken;
                      (null == h ? void 0 : h.length) &&
                        (n.url = "".concat(n.url, "?token=").concat(h));
                    }
                    switch (n.type) {
                      case p.AttachmentType.Image:
                        return new s.ImageAttachmentComponent(e, t, n, o, l);
                      case p.AttachmentType.Video:
                        return new c.VideoAttachmentComponent(e, t, n, o, l);
                      case p.AttachmentType.Audio:
                        return new r.AudioAttachmentComponent(e, t, n, o, l);
                      case p.AttachmentType.File:
                        return new a.FileAttachmentComponent(e, t, n, o, l);
                      default:
                        throw Error("Payload contains wrong attachment type");
                    }
                  }),
                  (t.prototype.getContent = function () {
                    return e.prototype.getContent.call(
                      this,
                      this._attachment.render()
                    );
                  }),
                  (t.tokenRegex = /token=[a-z\.\d]+/i),
                  t
                );
              })(l.MessageComponent);
            t.AttachmentMessageComponent = h;
          },
          4483: function (e, t, n) {
            Object.defineProperty(t, "__esModule", { value: !0 }),
              (t.AttachmentComponent = void 0);
            var o = n(1389),
              i = n(3145),
              r = n(6166),
              a = n(4534),
              s = (function () {
                function e(e, t, n, o, i) {
                  (this.settings = e),
                    (this.util = t),
                    (this.side = o),
                    (this.hasActions = i),
                    (this._url = n.url),
                    (this._type = n.type);
                  var r = n.url.split("/");
                  this._title = decodeURI(n.title || r[r.length - 1]);
                }
                return (
                  (e.capitalize = function (e) {
                    return e.charAt(0).toUpperCase() + e.slice(1);
                  }),
                  (e.prototype.createDownloadButton = function (e) {
                    var t = this.util,
                      n = this.settings,
                      i = t.createElement("a"),
                      r = t.createIconButton({
                        css: [
                          "attachment-control-icon",
                          "attachment-button",
                          "flex",
                        ],
                        icon: n.icons.download || o.iconDownload,
                        iconCss: ["attachment-download-icon"],
                        title: n.i18n[n.locale].download,
                      });
                    return (
                      i.setAttribute("href", e),
                      i.setAttribute("download", ""),
                      i.setAttribute("target", "_blank"),
                      i.appendChild(r),
                      i
                    );
                  }),
                  (e.prototype.createAttachment = function (e, t) {
                    var n = this,
                      s = this.util,
                      c = this.settings,
                      l = s.createDiv(["attachment"]),
                      p = s.createDiv(["attachment-placeholder", "flex"]),
                      h = s.createDiv(["attachment-icon"]),
                      u = s.createImageIcon({ icon: e, title: "" });
                    h.appendChild(u);
                    var d = this._title,
                      g = s.createDiv([
                        "attachment-footer",
                        "flex",
                        this.hasActions && "with-actions",
                      ]),
                      f = s.createElement("label", ["attachment-title"]),
                      m = s.createDiv(["attachment-controls", "flex"]);
                    if (
                      ((f.innerText = d),
                      f.setAttribute("title", d),
                      g.appendChild(f),
                      this._type === r.AttachmentType.Image)
                    ) {
                      var v = s.createIconButton({
                        css: [
                          "attachment-control-icon",
                          "attachment-button",
                          "flex",
                        ],
                        icon: c.icons.expandImage || o.iconZoom,
                        iconCss: ["attachment-expand-icon"],
                        title: c.i18n[c.locale].imageViewerOpen,
                      });
                      (v.onclick = function () {
                        n.createImagePreview(n._url, d);
                      }),
                        m.appendChild(v);
                    }
                    if (
                      (this.side === i.MESSAGE_SIDE.LEFT &&
                        m.appendChild(this.createDownloadButton(this._url)),
                      t)
                    )
                      switch (
                        (p.appendChild(t),
                        (t.onerror = function () {
                          t.remove(), p.appendChild(h);
                        }),
                        this._type)
                      ) {
                        case r.AttachmentType.Image:
                          (t.onload = function () {
                            t.clientHeight > a.ATTACHMENT_MAX_HEIGHT &&
                              (p.style.alignItems = "flex-start"),
                              g.appendChild(m);
                          }),
                            (t.onclick = function () {
                              n.createImagePreview(n._url, n._title);
                            });
                          break;
                        case r.AttachmentType.Audio:
                        case r.AttachmentType.Video:
                          t.onloadeddata = function () {
                            g.appendChild(m);
                          };
                      }
                    else p.appendChild(h), g.appendChild(m);
                    return l.appendChild(p), null == l || l.appendChild(g), l;
                  }),
                  (e.prototype.createImagePreview = function (e, t) {
                    var n = this.util,
                      i = "image-preview",
                      r = this.settings,
                      a = n.createDiv(["".concat(i, "-wrapper")]),
                      s = n.createImage(e, [i]),
                      c = n.createElement("label", ["".concat(i, "-title")]);
                    c.innerText = t;
                    var l = document.querySelector(
                        ".".concat(this.settings.name, "-wrapper")
                      ),
                      p = r.icons.close || o.iconClose,
                      h = n.createIconButton({
                        css: ["".concat(i, "-close")],
                        icon: p,
                        iconCss: ["".concat(i, "-close-icon")],
                        title: r.i18n[r.locale].imageViewerClose,
                      });
                    (h.onclick = function () {
                      a.remove();
                    }),
                      (h.onkeydown = function (e) {
                        "Tab" === e.code && (a.focus(), e.preventDefault());
                      });
                    var u = n.createDiv(["".concat(i, "-header")]);
                    u.appendChild(c),
                      u.appendChild(h),
                      a.appendChild(u),
                      a.appendChild(s),
                      a.setAttribute("tabindex", "-1"),
                      (a.onkeydown = function (e) {
                        "Escape" === e.code && a.remove();
                      }),
                      l.appendChild(a),
                      a.focus();
                  }),
                  e
                );
              })();
            t.AttachmentComponent = s;
          },
          2714: function (e, t, n) {
            var o,
              i =
                (this && this.__extends) ||
                ((o = function (e, t) {
                  return (o =
                    Object.setPrototypeOf ||
                    ({ __proto__: [] } instanceof Array &&
                      function (e, t) {
                        e.__proto__ = t;
                      }) ||
                    function (e, t) {
                      for (var n in t)
                        Object.prototype.hasOwnProperty.call(t, n) &&
                          (e[n] = t[n]);
                    })(e, t);
                }),
                function (e, t) {
                  if ("function" != typeof t && null !== t)
                    throw new TypeError(
                      "Class extends value " +
                        String(t) +
                        " is not a constructor or null"
                    );
                  function n() {
                    this.constructor = e;
                  }
                  o(e, t),
                    (e.prototype =
                      null === t
                        ? Object.create(t)
                        : ((n.prototype = t.prototype), new n()));
                });
            Object.defineProperty(t, "__esModule", { value: !0 }),
              (t.AudioAttachmentComponent = void 0);
            var r = n(1389),
              a = n(5949),
              s = n(3145),
              c = (function (e) {
                function t() {
                  return (null !== e && e.apply(this, arguments)) || this;
                }
                return (
                  i(t, e),
                  (t.prototype.render = function () {
                    var e = this.util,
                      t = this.settings,
                      n = t.icons.fileAudio || r.iconAudio,
                      o = e.createMedia(
                        "video",
                        ["attachment-audio"],
                        this._url
                      );
                    (o.controls = !0),
                      (o.preload = "metadata"),
                      s.MESSAGE_SIDE.RIGHT === this.side &&
                        o.setAttribute("controlsList", "nodownload");
                    var i = '<a href="'.concat(this._url, '">'),
                      c = t.i18n[t.locale].attachmentAudioFallback
                        .replace("{0}", i)
                        .replace("{/0}", "</a>");
                    return (
                      (o.innerHTML = c),
                      t.linkHandler
                        ? (0, a.setEmbeddedLinksHandler)(o, t.linkHandler)
                        : t.openLinksInNewWindow &&
                          (0, a.setLinksOpenInNewWindow)(o),
                      this.createAttachment(n, o)
                    );
                  }),
                  t
                );
              })(n(4483).AttachmentComponent);
            t.AudioAttachmentComponent = c;
          },
          6086: function (e, t, n) {
            var o,
              i =
                (this && this.__extends) ||
                ((o = function (e, t) {
                  return (o =
                    Object.setPrototypeOf ||
                    ({ __proto__: [] } instanceof Array &&
                      function (e, t) {
                        e.__proto__ = t;
                      }) ||
                    function (e, t) {
                      for (var n in t)
                        Object.prototype.hasOwnProperty.call(t, n) &&
                          (e[n] = t[n]);
                    })(e, t);
                }),
                function (e, t) {
                  if ("function" != typeof t && null !== t)
                    throw new TypeError(
                      "Class extends value " +
                        String(t) +
                        " is not a constructor or null"
                    );
                  function n() {
                    this.constructor = e;
                  }
                  o(e, t),
                    (e.prototype =
                      null === t
                        ? Object.create(t)
                        : ((n.prototype = t.prototype), new n()));
                });
            Object.defineProperty(t, "__esModule", { value: !0 }),
              (t.FileAttachmentComponent = void 0);
            var r = n(1389),
              a = (function (e) {
                function t() {
                  return (null !== e && e.apply(this, arguments)) || this;
                }
                return (
                  i(t, e),
                  (t.prototype.render = function () {
                    var e = this.settings.icons.fileGeneric || r.iconFile;
                    return this.createAttachment(e);
                  }),
                  t
                );
              })(n(4483).AttachmentComponent);
            t.FileAttachmentComponent = a;
          },
          2406: function (e, t, n) {
            var o,
              i =
                (this && this.__extends) ||
                ((o = function (e, t) {
                  return (o =
                    Object.setPrototypeOf ||
                    ({ __proto__: [] } instanceof Array &&
                      function (e, t) {
                        e.__proto__ = t;
                      }) ||
                    function (e, t) {
                      for (var n in t)
                        Object.prototype.hasOwnProperty.call(t, n) &&
                          (e[n] = t[n]);
                    })(e, t);
                }),
                function (e, t) {
                  if ("function" != typeof t && null !== t)
                    throw new TypeError(
                      "Class extends value " +
                        String(t) +
                        " is not a constructor or null"
                    );
                  function n() {
                    this.constructor = e;
                  }
                  o(e, t),
                    (e.prototype =
                      null === t
                        ? Object.create(t)
                        : ((n.prototype = t.prototype), new n()));
                });
            Object.defineProperty(t, "__esModule", { value: !0 }),
              (t.ImageAttachmentComponent = void 0);
            var r = n(4483),
              a = n(1389),
              s = (function (e) {
                function t() {
                  return (null !== e && e.apply(this, arguments)) || this;
                }
                return (
                  i(t, e),
                  (t.prototype.render = function () {
                    var e = this.util,
                      t = this.settings.icons.fileImage || a.iconImage,
                      n = e.createImage(
                        this._url,
                        ["attachment-image"],
                        this._title
                      );
                    return this.createAttachment(t, n);
                  }),
                  t
                );
              })(r.AttachmentComponent);
            t.ImageAttachmentComponent = s;
          },
          8175: function (e, t, n) {
            var o,
              i =
                (this && this.__extends) ||
                ((o = function (e, t) {
                  return (o =
                    Object.setPrototypeOf ||
                    ({ __proto__: [] } instanceof Array &&
                      function (e, t) {
                        e.__proto__ = t;
                      }) ||
                    function (e, t) {
                      for (var n in t)
                        Object.prototype.hasOwnProperty.call(t, n) &&
                          (e[n] = t[n]);
                    })(e, t);
                }),
                function (e, t) {
                  if ("function" != typeof t && null !== t)
                    throw new TypeError(
                      "Class extends value " +
                        String(t) +
                        " is not a constructor or null"
                    );
                  function n() {
                    this.constructor = e;
                  }
                  o(e, t),
                    (e.prototype =
                      null === t
                        ? Object.create(t)
                        : ((n.prototype = t.prototype), new n()));
                });
            Object.defineProperty(t, "__esModule", { value: !0 }),
              (t.VideoAttachmentComponent = void 0);
            var r = n(1389),
              a = n(5949),
              s = n(3145),
              c = (function (e) {
                function t() {
                  return (null !== e && e.apply(this, arguments)) || this;
                }
                return (
                  i(t, e),
                  (t.prototype.render = function () {
                    var e = this.util,
                      t = this.settings,
                      n = t.icons.fileVideo || r.iconVideo;
                    if ((0, a.getYouTubeID)(this._url)) {
                      var o = e.createElement("span");
                      return (
                        (o.innerHTML = e.linkify(this._url, {
                          emHTML: !0,
                          emVideo: t.embeddedVideo,
                        })),
                        o
                      );
                    }
                    var i = e.createMedia(
                      "video",
                      ["attachment-video"],
                      this._url
                    );
                    (i.controls = !0),
                      (i.preload = "metadata"),
                      s.MESSAGE_SIDE.RIGHT === this.side &&
                        i.setAttribute("controlsList", "nodownload");
                    var c = '<a href="'.concat(this._url, '">'),
                      l = t.i18n[t.locale].attachmentVideoFallback
                        .replace("{0}", c)
                        .replace("{/0}", "</a>");
                    return (
                      (i.innerHTML = l),
                      this.settings.linkHandler
                        ? (0, a.setEmbeddedLinksHandler)(i, t.linkHandler)
                        : this.settings.openLinksInNewWindow &&
                          (0, a.setLinksOpenInNewWindow)(i),
                      this.createAttachment(n, i)
                    );
                  }),
                  t
                );
              })(n(4483).AttachmentComponent);
            t.VideoAttachmentComponent = c;
          },
          9070: function (e, t, n) {
            var o,
              i =
                (this && this.__extends) ||
                ((o = function (e, t) {
                  return (o =
                    Object.setPrototypeOf ||
                    ({ __proto__: [] } instanceof Array &&
                      function (e, t) {
                        e.__proto__ = t;
                      }) ||
                    function (e, t) {
                      for (var n in t)
                        Object.prototype.hasOwnProperty.call(t, n) &&
                          (e[n] = t[n]);
                    })(e, t);
                }),
                function (e, t) {
                  if ("function" != typeof t && null !== t)
                    throw new TypeError(
                      "Class extends value " +
                        String(t) +
                        " is not a constructor or null"
                    );
                  function n() {
                    this.constructor = e;
                  }
                  o(e, t),
                    (e.prototype =
                      null === t
                        ? Object.create(t)
                        : ((n.prototype = t.prototype), new n()));
                });
            Object.defineProperty(t, "__esModule", { value: !0 }),
              (t.C2SQLBaseMessageComponent = void 0);
            var r = (function (e) {
              function t(t, n, o, i, r, a, s) {
                var c = e.call(this, t, n, o, i, r, a, s) || this;
                return (
                  (c.cssPrefix = t.name),
                  (c._payload = o),
                  (c._isActionsExternal = !0),
                  c
                );
              }
              return (
                i(t, e),
                (t.prototype.render = function () {
                  return e.prototype.render.call(this);
                }),
                (t.prototype.getHeader = function () {
                  var t = this.util,
                    n = e.prototype.getHeader.call(this);
                  return t.addCSSClass(n, "message-header-yellow"), n;
                }),
                (t.prototype.getContent = function (e) {
                  var t = "message-bubble",
                    n = this.util.createDiv([
                      t,
                      "".concat(t, "-tabular-message"),
                    ]);
                  e && n.appendChild(e);
                  var o = this.getPageStatus();
                  return o && n.appendChild(o), n;
                }),
                (t.prototype.getPageStatus = function () {
                  var e,
                    t = this.util,
                    n = this._payload.paginationInfo;
                  return (
                    n &&
                      n.totalCount > n.rangeSize &&
                      ((e = t.createDiv(["results-page-status"])).innerText =
                        n.status),
                    e
                  );
                }),
                t
              );
            })(n(3145).MessageComponent);
            t.C2SQLBaseMessageComponent = r;
          },
          8954: function (e, t, n) {
            var o,
              i =
                (this && this.__extends) ||
                ((o = function (e, t) {
                  return (o =
                    Object.setPrototypeOf ||
                    ({ __proto__: [] } instanceof Array &&
                      function (e, t) {
                        e.__proto__ = t;
                      }) ||
                    function (e, t) {
                      for (var n in t)
                        Object.prototype.hasOwnProperty.call(t, n) &&
                          (e[n] = t[n]);
                    })(e, t);
                }),
                function (e, t) {
                  if ("function" != typeof t && null !== t)
                    throw new TypeError(
                      "Class extends value " +
                        String(t) +
                        " is not a constructor or null"
                    );
                  function n() {
                    this.constructor = e;
                  }
                  o(e, t),
                    (e.prototype =
                      null === t
                        ? Object.create(t)
                        : ((n.prototype = t.prototype), new n()));
                }),
              r =
                (this && this.__spreadArray) ||
                function (e, t, n) {
                  if (n || 2 === arguments.length)
                    for (var o, i = 0, r = t.length; i < r; i++)
                      (!o && i in t) ||
                        (o || (o = Array.prototype.slice.call(t, 0, i)),
                        (o[i] = t[i]));
                  return e.concat(o || Array.prototype.slice.call(t));
                };
            Object.defineProperty(t, "__esModule", { value: !0 }),
              (t.CardMessageComponent = void 0);
            var a = n(1389),
              s = n(1887),
              c = n(3145),
              l = n(5949),
              p = (function (e) {
                function t(t, n, o, i, r, a, c) {
                  var l = e.call(this, t, n, o, i, r, a, c) || this;
                  (l.cards = []),
                    (l.layout = o.layout),
                    (l.numCards = o.cards.length);
                  var p = 0;
                  return (
                    o.cards.forEach(function (e) {
                      p++,
                        l.cards.push(
                          new s.CardComponent(l.settings, n, e, p, c)
                        );
                    }),
                    (l.globalActions = l.actions.concat(l.globalActions)),
                    (l.actions = []),
                    l
                  );
                }
                return (
                  i(t, e),
                  (t.prototype.hasActions = function () {
                    return (
                      this.cards[0].hasActions() ||
                      this.actions.length > 0 ||
                      this.globalActions.length > 0
                    );
                  }),
                  (t.prototype.disableActions = function () {
                    e.prototype.disableActions.call(this),
                      this.cards.forEach(function (e) {
                        e.disableActions();
                      });
                  }),
                  (t.prototype.disablePostbacks = function () {
                    e.prototype.disablePostbacks.call(this),
                      this.cards.forEach(function (e) {
                        e.disablePostbacks();
                      });
                  }),
                  (t.prototype.enableActions = function () {
                    e.prototype.enableActions.call(this),
                      this.cards.forEach(function (e) {
                        e.enableActions();
                      });
                  }),
                  (t.prototype.enablePostbacks = function () {
                    e.prototype.enablePostbacks.call(this),
                      this.cards.forEach(function (e) {
                        e.enablePostbacks();
                      });
                  }),
                  (t.prototype.render = function () {
                    var t = this.util,
                      n = this.settings.name,
                      o = ["card-message-".concat(this.layout)],
                      i = e.prototype.render.call(this);
                    if (i.querySelector(".".concat(n, "-icon-wrapper"))) {
                      o.push("has-message-icon");
                      var a = i.querySelector(
                        ".".concat(n, "-content-wrapper")
                      );
                      t.addCSSClass(a, "with-icon");
                    }
                    return (
                      this.cards.length > 1 && o.push("carousel"),
                      t.addCSSClass.apply(t, r([i], o, !1)),
                      i
                    );
                  }),
                  (t.prototype.getContent = function () {
                    var e,
                      t = this,
                      n = this.util,
                      o = n.createDiv(["card-message-content"]),
                      i = n.createDiv(["card-message-cards"]),
                      r = !0;
                    return (
                      this.cards.forEach(function (e) {
                        e.onActionClick = t.handleOnActionClick.bind(t);
                        var n = e.render();
                        r &&
                          e.hasActions() &&
                          ((t.firstActionButton = e.getFirstActionButton()),
                          (r = !1)),
                          i.appendChild(n);
                      }),
                      o.appendChild(i),
                      "horizontal" === this.layout &&
                        this.numCards > 1 &&
                        (o.appendChild(this.getNextButton()),
                        (this.activeCard = 0),
                        i.addEventListener("scroll", function () {
                          window.clearTimeout(e),
                            (e = window.setTimeout(function () {
                              for (var e = 0, n = 0; n < t.numCards; n++) {
                                var o = i.children[n];
                                if (i.scrollLeft <= o.offsetLeft + 5) {
                                  e = n;
                                  break;
                                }
                              }
                              e !== t.activeCard &&
                                ((t.activeCard = e),
                                t.updateCardsScrollState());
                            }, 100));
                        }),
                        window.addEventListener(
                          "resize",
                          (0, l.debounce)(function () {
                            t.showHideNavButtons();
                          }, 500)
                        )),
                      (this.content = o),
                      (this.cardsWrapper = i),
                      setTimeout(function () {
                        t.showHideNavButtons();
                      }, 0),
                      o
                    );
                  }),
                  (t.prototype.getNextButton = function () {
                    if (!this.nextButton) {
                      var e = this.util,
                        t = this.translations.cardNavNext;
                      this.nextButton = e.createDiv(["next-wrapper"]);
                      var n = e.createButton(["round", "next"]);
                      (n.title = t), n.setAttribute("aria-label", t);
                      var o = e.createElementFromString(a.iconChevronNext);
                      o.setAttribute("role", "img"),
                        o.setAttribute("aria-label", t),
                        n.appendChild(o),
                        (n.onclick = this.showNextCard.bind(this)),
                        this.nextButton.appendChild(n);
                    }
                    return this.nextButton;
                  }),
                  (t.prototype.getPreviousButton = function () {
                    if (!this.prevButton) {
                      var e = this.util,
                        t = this.translations.cardNavPrevious;
                      this.prevButton = e.createDiv(["prev-wrapper"]);
                      var n = e.createButton(["round", "previous"]);
                      (n.title = t), n.setAttribute("aria-label", t);
                      var o = e.createElementFromString(a.iconChevronPrevious);
                      o.setAttribute("role", "img"),
                        o.setAttribute("aria-label", t),
                        n.appendChild(o),
                        (n.onclick = this.showPrevCard.bind(this)),
                        this.prevButton.appendChild(n);
                    }
                    return this.prevButton;
                  }),
                  (t.prototype.showNextCard = function () {
                    this.activeCard < this.numCards &&
                      (this.activeCard++, this.updateCardsScrollState());
                  }),
                  (t.prototype.showPrevCard = function () {
                    this.activeCard > 0 &&
                      (this.activeCard--, this.updateCardsScrollState());
                  }),
                  (t.prototype.updateCardsScrollState = function () {
                    var e,
                      t,
                      n,
                      o,
                      i = this.cardsWrapper.children[this.activeCard];
                    i &&
                      ((this.cardsWrapper.scrollLeft = i.offsetLeft - 56),
                      0 === this.activeCard
                        ? null === (e = this.prevButton) ||
                          void 0 === e ||
                          e.remove()
                        : (null === (t = this.prevButton) || void 0 === t
                            ? void 0
                            : t.parentElement) ||
                          this.content.prepend(this.getPreviousButton()),
                      this.activeCard === this.numCards - 1
                        ? null === (n = this.nextButton) ||
                          void 0 === n ||
                          n.remove()
                        : (null === (o = this.nextButton) || void 0 === o
                            ? void 0
                            : o.parentElement) ||
                          this.content.appendChild(this.getNextButton()));
                  }),
                  (t.prototype.showHideNavButtons = function () {
                    this.cardsWrapper.scrollWidth ===
                    this.cardsWrapper.offsetWidth
                      ? (this.nextButton && (this.nextButton.hidden = !0),
                        this.prevButton && (this.prevButton.hidden = !0))
                      : (this.nextButton && (this.nextButton.hidden = !1),
                        this.prevButton && (this.prevButton.hidden = !1));
                  }),
                  t
                );
              })(c.MessageComponent);
            t.CardMessageComponent = p;
          },
          1887: function (e, t, n) {
            Object.defineProperty(t, "__esModule", { value: !0 }),
              (t.CardComponent = void 0);
            var o = n(416),
              i = n(2226),
              r = n(5949),
              a = (function () {
                function e(e, t, n, r, a) {
                  var s;
                  if (
                    ((this.settings = e),
                    (this.util = t),
                    (this.options = a),
                    (this._actions = []),
                    (this._postActions = []),
                    (this._title = n.title),
                    (this._description = n.description),
                    (this._imageUrl = n.imageUrl),
                    (this._url = n.url),
                    n.actions)
                  ) {
                    for (var c = 0, l = n.actions; c < l.length; c++) {
                      var p = l[c],
                        h =
                          (this._title ? this._title + " - " : "") +
                          (this._description ? this._description + " - " : "") +
                          (null !== (s = this._url) && void 0 !== s ? s : ""),
                        u = i.ActionComponentFactory.fromActionPayload(
                          p,
                          t,
                          e.openLinksInNewWindow,
                          h,
                          e.linkHandler,
                          a
                        );
                      u &&
                        ((u.onActionClick =
                          this.handleOnActionClick.bind(this)),
                        this._actions.push(u));
                    }
                    this._postActions = (0, o.getPostActions)(this._actions);
                  }
                }
                return (
                  (e.prototype.handleOnActionClick = function (e) {
                    this.onActionClick && this.onActionClick(e);
                  }),
                  (e.prototype.render = function () {
                    var e = this.util,
                      t = this.settings,
                      n = t.locale,
                      o = this._url,
                      i = e.createDiv(["card"]),
                      a = o
                        ? e.createAnchor(
                            o,
                            "",
                            ["card-component"],
                            t.openLinksInNewWindow,
                            t.linkHandler
                          )
                        : e.createDiv(["card-content"]);
                    if ((this._url && (a.innerText = ""), this._imageUrl)) {
                      var s = t.i18n,
                        c = s[n].cardImagePlaceholder;
                      if (this.options && this.options.locale) {
                        var l = s[this.options.locale];
                        c = l ? l.cardImagePlaceholder : c;
                      }
                      a.appendChild(
                        e.createImage(this._imageUrl, ["card-image"], c)
                      );
                    }
                    var p = { emHTML: !0, emVideo: !0 },
                      h = e.createDiv(["card-title"]);
                    if (
                      ((h.innerHTML = e.linkify(this._title, p)),
                      a.appendChild(h),
                      this._description)
                    ) {
                      var u = e.createDiv(["card-description"]);
                      (u.innerHTML = e.linkify(this._description, p)),
                        a.appendChild(u);
                    }
                    if (
                      (i.appendChild(a),
                      this.settings.linkHandler
                        ? (0, r.setEmbeddedLinksHandler)(a, t.linkHandler)
                        : this.settings.openLinksInNewWindow &&
                          (0, r.setLinksOpenInNewWindow)(a),
                      this._actions.length > 0)
                    ) {
                      for (
                        var d = e.createDiv(
                            t.displayActionsAsPills
                              ? ["card-actions", "card-actions-pill"]
                              : ["card-actions"]
                          ),
                          g = !0,
                          f = 0,
                          m = this._actions;
                        f < m.length;
                        f++
                      ) {
                        var v = m[f].render();
                        g && ((this.firstActionButton = v), (g = !1)),
                          d.appendChild(v);
                      }
                      i.appendChild(d);
                    }
                    return i;
                  }),
                  (e.prototype.hasActions = function () {
                    return this._actions.length > 0;
                  }),
                  (e.prototype.disableActions = function () {
                    this._actions.forEach(function (e) {
                      return e.disable();
                    });
                  }),
                  (e.prototype.disablePostbacks = function () {
                    this._postActions.forEach(function (e) {
                      return e.disable();
                    });
                  }),
                  (e.prototype.enableActions = function () {
                    this._actions.forEach(function (e) {
                      return e.enable();
                    });
                  }),
                  (e.prototype.enablePostbacks = function () {
                    this._postActions.forEach(function (e) {
                      return e.enable();
                    });
                  }),
                  (e.prototype.getFirstActionButton = function () {
                    return this.firstActionButton;
                  }),
                  e
                );
              })();
            t.CardComponent = a;
          },
          3353: function (e, t, n) {
            var o,
              i =
                (this && this.__extends) ||
                ((o = function (e, t) {
                  return (o =
                    Object.setPrototypeOf ||
                    ({ __proto__: [] } instanceof Array &&
                      function (e, t) {
                        e.__proto__ = t;
                      }) ||
                    function (e, t) {
                      for (var n in t)
                        Object.prototype.hasOwnProperty.call(t, n) &&
                          (e[n] = t[n]);
                    })(e, t);
                }),
                function (e, t) {
                  if ("function" != typeof t && null !== t)
                    throw new TypeError(
                      "Class extends value " +
                        String(t) +
                        " is not a constructor or null"
                    );
                  function n() {
                    this.constructor = e;
                  }
                  o(e, t),
                    (e.prototype =
                      null === t
                        ? Object.create(t)
                        : ((n.prototype = t.prototype), new n()));
                });
            Object.defineProperty(t, "__esModule", { value: !0 }),
              (t.getFormItem = t.FormMessageComponent = void 0);
            var r = n(9070),
              a = n(5949),
              s = (function (e) {
                function t() {
                  return (null !== e && e.apply(this, arguments)) || this;
                }
                return (
                  i(t, e),
                  (t.prototype.getContent = function () {
                    var t = this,
                      n = this.util,
                      o = this._payload,
                      i = o.headerText,
                      r = "form-message",
                      a = n.createDiv([r]);
                    if (i) {
                      var s = n.createDiv(["".concat(r, "-header")]);
                      (s.innerText = i), a.appendChild(s);
                    }
                    return (
                      o.formColumns > 2 && (o.formColumns = 2),
                      o.forms.forEach(function (e) {
                        var i = c(n, e.fields, o.formColumns, t.settings);
                        a.appendChild(i);
                      }),
                      e.prototype.getContent.call(this, a)
                    );
                  }),
                  t
                );
              })(r.C2SQLBaseMessageComponent);
            function c(e, t, n, o) {
              var i = "form-message",
                r = "".concat(i, "-field"),
                s = [r, "".concat(r, "-col-").concat(n)],
                c = e.createDiv(["".concat(i, "-item")]);
              return (
                t.forEach(function (t) {
                  var n = e.createDiv(s),
                    r = e.createDiv(["".concat(i, "-key")]),
                    l = e.createDiv(["".concat(i, "-value")]);
                  if (((r.innerText = t.label), "link" === t.displayType)) {
                    var p = e.createDiv(),
                      h = e.createElement("a", t.linkLabel ? [] : ["ellipsis"]);
                    (h.href = t.value),
                      (h.innerText =
                        t.linkLabel || (0, a.skipHTTPS)(t.value) || ""),
                      h.setAttribute("target", "_blank"),
                      p.appendChild(h),
                      o.linkHandler
                        ? (0, a.setEmbeddedLinksHandler)(p, o.linkHandler)
                        : o.openLinksInNewWindow &&
                          (0, a.setLinksOpenInNewWindow)(p),
                      l.appendChild(h);
                  } else l.innerText = t.value || "";
                  var u = t.alignment;
                  u && (l.style.textAlign = u),
                    n.appendChild(r),
                    n.appendChild(l),
                    c.appendChild(n);
                }),
                c
              );
            }
            (t.FormMessageComponent = s), (t.getFormItem = c);
          },
          2401: function (e, t, n) {
            Object.defineProperty(t, "__esModule", { value: !0 }),
              (t.LoadingMessageComponent = void 0);
            var o = n(9174),
              i = n(3145),
              r = (function () {
                function e(e, t, n, o) {
                  (this.text = e),
                    (this.side = t),
                    (this.settings = n),
                    (this.util = o);
                }
                return (
                  (e.prototype.render = function () {
                    var e,
                      t = this.util,
                      n = this.settings.icons,
                      r = t.createDiv(["attachment"]),
                      a =
                        this.side === i.MESSAGE_SIDE.LEFT
                          ? n.avatarBot
                          : n.avatarUser;
                    a &&
                      (e = t.createImageIcon({
                        icon: a,
                        iconCss: ["message-icon"],
                        title: "",
                      }));
                    var s = t.createDiv(["attachment-footer", "flex"]),
                      c = t.createDiv(["attachment-title"]);
                    (c.innerText = this.text), s.appendChild(c);
                    var l = t.createDiv(["attachment-placeholder", "flex"]);
                    return (
                      l.appendChild(new o.SpinnerComponent(t).render()),
                      r.appendChild(l),
                      r.appendChild(s),
                      (this._element = t.getMessageBlock(this.side, r, e)),
                      this._element
                    );
                  }),
                  (e.prototype.remove = function () {
                    this._element.remove();
                  }),
                  e
                );
              })();
            t.LoadingMessageComponent = r;
          },
          9174: function (e, t) {
            Object.defineProperty(t, "__esModule", { value: !0 }),
              (t.SpinnerComponent = void 0);
            var n = (function () {
              function e(e) {
                this.util = e;
              }
              return (
                (e.prototype.render = function () {
                  var e = this.util.createDiv(["spinner"]);
                  return (
                    (e.innerHTML =
                      '<svg viewBox="0 0 64 64"><circle transform="translate(32,32)" r="26"></circle></svg>'),
                    e
                  );
                }),
                e
              );
            })();
            t.SpinnerComponent = n;
          },
          8215: function (e, t, n) {
            var o,
              i =
                (this && this.__extends) ||
                ((o = function (e, t) {
                  return (o =
                    Object.setPrototypeOf ||
                    ({ __proto__: [] } instanceof Array &&
                      function (e, t) {
                        e.__proto__ = t;
                      }) ||
                    function (e, t) {
                      for (var n in t)
                        Object.prototype.hasOwnProperty.call(t, n) &&
                          (e[n] = t[n]);
                    })(e, t);
                }),
                function (e, t) {
                  if ("function" != typeof t && null !== t)
                    throw new TypeError(
                      "Class extends value " +
                        String(t) +
                        " is not a constructor or null"
                    );
                  function n() {
                    this.constructor = e;
                  }
                  o(e, t),
                    (e.prototype =
                      null === t
                        ? Object.create(t)
                        : ((n.prototype = t.prototype), new n()));
                });
            Object.defineProperty(t, "__esModule", { value: !0 }),
              (t.LocationMessageComponent = void 0);
            var r = n(3145),
              a = n(1389),
              s = (function (e) {
                function t(t, n, o, i, r, a, s) {
                  var c = e.call(this, t, n, o, i, r, a, s) || this,
                    l = o.location;
                  return (
                    (c._title = l.title),
                    (c._url = l.url),
                    (c._longitude = l.longitude),
                    (c._latitude = l.latitude),
                    c
                  );
                }
                return (
                  i(t, e),
                  (t.prototype.render = function () {
                    var e = this.util,
                      t = e.createDiv(["message"]);
                    (t.lang = this.locale), t.appendChild(this.getSender());
                    var n = e.createDiv(["message-wrapper"]);
                    t.appendChild(n);
                    var o = e.createDiv(["attachment"]),
                      i = e.createDiv(["attachment-placeholder", "flex"]),
                      r = e.createDiv(["attachment-icon"]),
                      s = e.createImageIcon({
                        icon:
                          this.settings.icons.shareMenuLocation ||
                          a.iconShareLocation,
                        title: "",
                      }),
                      c = e.createDiv(["attachment-footer", "flex"]),
                      l = e.createElement("label", ["attachment-title"]);
                    if (
                      ((l.innerText = this._title
                        ? this._title
                        : ""
                            .concat(this._latitude.toFixed(4), ", ")
                            .concat(this._longitude.toFixed(4))),
                      c.appendChild(l),
                      r.appendChild(s),
                      i.appendChild(r),
                      !this.actions.length)
                    ) {
                      var p = e.createDiv(["attachment-controls"]),
                        h = e.createIconButton({
                          css: [
                            "attachment-control-icon",
                            "attachment-button",
                            "flex",
                          ],
                          icon:
                            this.settings.icons.externalLink ||
                            a.iconExternalLink,
                          iconCss: [],
                          title: this.translations.openMap,
                        }),
                        u = e.createAnchor(
                          this._url ||
                            "https://www.google.com/maps/@"
                              .concat(this._latitude, ",")
                              .concat(this._longitude, ",12z"),
                          "",
                          [],
                          this.settings.openLinksInNewWindow,
                          this.settings.linkHandler
                        );
                      (h.onclick = function () {
                        u.click();
                      }),
                        p.appendChild(h),
                        c.appendChild(p);
                    }
                    return (
                      o.appendChild(i),
                      o.appendChild(c),
                      n.appendChild(this.getContent(o)),
                      t
                    );
                  }),
                  t
                );
              })(r.MessageComponent);
            t.LocationMessageComponent = s;
          },
          9176: function (e, t, n) {
            Object.defineProperty(t, "__esModule", { value: !0 }),
              (t.MessageStringComponent = void 0);
            var o = n(3145),
              i = (function () {
                function e(e, t, n, o, i, r) {
                  void 0 === r && (r = !0),
                    (this.title = e),
                    (this.text = t),
                    (this.side = n),
                    (this.settings = o),
                    (this.util = i),
                    (this.isError = r);
                }
                return (
                  (e.prototype.render = function (e) {
                    var t,
                      n = this.util,
                      i = this.settings.icons,
                      r = "message",
                      a = n.createDiv(["".concat(r, "-content")]),
                      s =
                        this.side === o.MESSAGE_SIDE.LEFT
                          ? i.avatarBot
                          : i.avatarUser;
                    if (
                      (s &&
                        (t = n.createImageIcon({
                          icon: s,
                          iconCss: ["".concat(r, "-icon")],
                          title: "",
                        })),
                      e)
                    ) {
                      n.addCSSClass(a, "".concat(r, "-with-icon"));
                      var c = n.createImageIcon({ icon: e, title: "" }),
                        l = n.createDiv(["".concat(r, "-icon")]);
                      l.appendChild(c), a.appendChild(l);
                    }
                    var p = n.createDiv(["".concat(r, "-text")]),
                      h = n.createDiv(["".concat(r, "-title")]),
                      u = n.createDiv(["".concat(r, "-description")]);
                    return (
                      (h.innerText = this.title),
                      (u.innerText = this.text),
                      p.appendChild(h),
                      p.appendChild(u),
                      a.appendChild(p),
                      n.getMessageBlock(this.side, a, t, this.isError)
                    );
                  }),
                  e
                );
              })();
            t.MessageStringComponent = i;
          },
          416: function (e, t, n) {
            Object.defineProperty(t, "__esModule", { value: !0 }),
              (t.getPostActions = void 0);
            var o = n(6166);
            t.getPostActions = function (e) {
              return e.filter(function (e) {
                var t = e.getActionType();
                return (
                  t === o.ActionType.Postback || t === o.ActionType.Location
                );
              });
            };
          },
          3145: function (e, t, n) {
            var o =
              (this && this.__assign) ||
              function () {
                return (o =
                  Object.assign ||
                  function (e) {
                    for (var t, n = 1, o = arguments.length; n < o; n++)
                      for (var i in (t = arguments[n]))
                        Object.prototype.hasOwnProperty.call(t, i) &&
                          (e[i] = t[i]);
                    return e;
                  }).apply(this, arguments);
              };
            Object.defineProperty(t, "__esModule", { value: !0 }),
              (t.MESSAGE_SIDE = t.MessageComponent = void 0);
            var i,
              r = n(416),
              a = n(2226),
              s = n(6166);
            !(function (e) {
              (e.LEFT = "left"), (e.RIGHT = "right");
            })(i || (i = {})),
              (t.MESSAGE_SIDE = i);
            var c = (function () {
              function e(e, t, n, i, a, c, p) {
                (this.settings = e),
                  (this.util = t),
                  (this.side = i),
                  (this.markAsRead = a),
                  (this.source = c),
                  (this.actions = []),
                  (this.globalActions = []),
                  (this._postActions = []),
                  (this.locale = e.locale),
                  (this.translations = e.i18n[this.locale]),
                  p &&
                    p.locale &&
                    ((this.locale = p.locale),
                    (this.translations = o(
                      o({}, this.translations),
                      this.settings.i18n[p.locale]
                    )));
                var h = "";
                switch (n.type) {
                  case s.MessageType.Card:
                    n.cards.forEach(function (e) {
                      var t;
                      h += "".concat(
                        (e.title ? "".concat(e.title, " - ") : "") +
                          (e.description
                            ? "".concat(e.description, " - ")
                            : "") +
                          (null !== (t = e.url) && void 0 !== t ? t : ""),
                        "\n"
                      );
                    });
                    break;
                  case s.MessageType.Text:
                    h = n.text;
                    break;
                  case s.MessageType.Attachment:
                    h = n.attachment.url;
                    break;
                  case s.MessageType.Location:
                    var u = n.location;
                    h = ""
                      .concat(u.title ? "".concat(u.title, " - ") : "")
                      .concat(u.latitude, ", ")
                      .concat(u.longitude);
                }
                if (
                  (n.actions &&
                    (this.actions = l(
                      n.actions,
                      t,
                      e.openLinksInNewWindow,
                      h,
                      e.linkHandler,
                      p,
                      this.handleOnActionClick.bind(this)
                    )),
                  (this._isActionsExternal = e.displayActionsAsPills),
                  n.globalActions)
                ) {
                  var d = l(
                    n.globalActions,
                    t,
                    e.openLinksInNewWindow,
                    h,
                    e.linkHandler,
                    p,
                    this.handleOnActionClick.bind(this)
                  );
                  this.globalActions = this.globalActions.concat(d);
                }
                (this.headerText = n.headerText),
                  (this.footerText = n.footerText),
                  (this._postActions = (0, r.getPostActions)(
                    this.actions
                  ).concat((0, r.getPostActions)(this.globalActions)));
              }
              return (
                (e.prototype.handleOnActionClick = function (e) {
                  if (this.onActionClick) {
                    var t = e;
                    (t.messageComponent = this), this.onActionClick(t);
                  }
                }),
                (e.prototype.updateMarkAsRead = function () {
                  return this.markAsRead(this.date);
                }),
                (e.prototype.hasActions = function () {
                  return (
                    this.actions.length > 0 || this.globalActions.length > 0
                  );
                }),
                (e.prototype.focusFirstAction = function () {
                  var e;
                  null === (e = this.firstActionButton) ||
                    void 0 === e ||
                    e.focus();
                }),
                (e.prototype.disableActions = function () {
                  this.actions.forEach(function (e) {
                    e.disable();
                  }),
                    this.globalActions.forEach(function (e) {
                      e.disable();
                    });
                }),
                (e.prototype.disablePostbacks = function () {
                  this._postActions.forEach(function (e) {
                    e.disable();
                  });
                }),
                (e.prototype.enableActions = function () {
                  this.actions.forEach(function (e) {
                    e.enable();
                  }),
                    this.globalActions.forEach(function (e) {
                      e.enable();
                    });
                }),
                (e.prototype.enablePostbacks = function () {
                  this._postActions.forEach(function (e) {
                    e.enable();
                  });
                }),
                (e.prototype.render = function (e) {
                  var t = this,
                    n = t.util,
                    o = t.actions,
                    i = t.globalActions,
                    r = n.createDiv(["message"]);
                  (r.lang = t.locale), r.appendChild(t.getSender());
                  var a = n.createDiv(["message-wrapper"]);
                  r.appendChild(a);
                  var s = t.getContent(e);
                  if (
                    (t.headerText && a.appendChild(t.getHeader()),
                    a.appendChild(s),
                    o && o.length)
                  ) {
                    var c = t.getActions();
                    (t._isActionsExternal ? a : s).appendChild(c),
                      t.firstActionButton ||
                        (t.firstActionButton = c.firstElementChild);
                  }
                  return (
                    t.footerText && a.appendChild(t.getFooter()),
                    i &&
                      i.length &&
                      ((c = t.getGlobalActions()),
                      r.appendChild(c),
                      t.firstActionButton ||
                        (t.firstActionButton = c.firstElementChild)),
                    r
                  );
                }),
                (e.prototype.getSender = function () {
                  var e =
                      this.side === i.LEFT
                        ? this.translations.skillMessage
                        : this.translations.userMessage,
                    t = this.util.createElement("span", ["screen-reader-only"]);
                  return (t.innerText = e), t;
                }),
                (e.prototype.getHeader = function () {
                  return p(this.headerText, "message-header", this.util);
                }),
                (e.prototype.getContent = function (e) {
                  var t = this.util.createDiv(["message-bubble"]);
                  return (
                    (t.style.padding =
                      this.settings.messagePadding || t.style.padding),
                    e && t.appendChild(e),
                    t
                  );
                }),
                (e.prototype.getActions = function () {
                  var e = this._isActionsExternal
                    ? ["message-global-actions", "flex", "col"]
                    : ["message-actions", "flex", "col"];
                  return h(this.actions, e, this.util);
                }),
                (e.prototype.getFooter = function () {
                  return p(this.footerText, "message-footer", this.util);
                }),
                (e.prototype.getGlobalActions = function () {
                  var e = ["message-global-actions"];
                  return (
                    this.settings.icons.avatarBot && e.push("has-message-icon"),
                    h(this.globalActions, e, this.util)
                  );
                }),
                e
              );
            })();
            function l(e, t, n, o, i, r, s) {
              var c = [];
              return (
                e.forEach(function (e) {
                  var l = a.ActionComponentFactory.fromActionPayload(
                    e,
                    t,
                    n,
                    o,
                    i,
                    r
                  );
                  l && ((l.onActionClick = s), c.push(l));
                }),
                c
              );
            }
            function p(e, t, n) {
              var o = n.createDiv(["message-bubble", t]);
              return (
                (o.innerHTML = n.linkify(e, { emHTML: !0, emVideo: !0 })), o
              );
            }
            function h(e, t, n) {
              var o = n.createDiv(t);
              return (
                e.forEach(function (e) {
                  o.appendChild(e.render());
                }),
                o
              );
            }
            t.MessageComponent = c;
          },
          6790: function (e, t, n) {
            var o,
              i =
                (this && this.__extends) ||
                ((o = function (e, t) {
                  return (o =
                    Object.setPrototypeOf ||
                    ({ __proto__: [] } instanceof Array &&
                      function (e, t) {
                        e.__proto__ = t;
                      }) ||
                    function (e, t) {
                      for (var n in t)
                        Object.prototype.hasOwnProperty.call(t, n) &&
                          (e[n] = t[n]);
                    })(e, t);
                }),
                function (e, t) {
                  if ("function" != typeof t && null !== t)
                    throw new TypeError(
                      "Class extends value " +
                        String(t) +
                        " is not a constructor or null"
                    );
                  function n() {
                    this.constructor = e;
                  }
                  o(e, t),
                    (e.prototype =
                      null === t
                        ? Object.create(t)
                        : ((n.prototype = t.prototype), new n()));
                });
            Object.defineProperty(t, "__esModule", { value: !0 }),
              (t.RawMessageComponent = void 0);
            var r = (function (e) {
              function t(t, n, o, i, r, a, s) {
                var c = e.call(this, t, n, o, i, r, a, s) || this;
                return (c._payload = JSON.stringify(o.payload)), c;
              }
              return (
                i(t, e),
                (t.prototype.getContent = function () {
                  var t = this.util.createElement("span");
                  return (
                    (t.innerText = this._payload),
                    e.prototype.getContent.call(this, t)
                  );
                }),
                t
              );
            })(n(3145).MessageComponent);
            t.RawMessageComponent = r;
          },
          9622: function (e, t, n) {
            Object.defineProperty(t, "__esModule", { value: !0 }),
              (t.RelativeTimestampComponent = void 0);
            var o = n(6166),
              i = window.setTimeout,
              r = window.setInterval,
              a = 36e5,
              s = 864e5,
              c = "relTimeNow",
              l = "relTimeMoment",
              p = "relTimeMin",
              h = "relTimeHr",
              u = (function () {
                function e(e, t) {
                  this.util = t;
                  var n = (this.cssPrefix = e.name),
                    o = e.icons;
                  this.i18n = e.i18n[e.locale];
                  var i = "-has-message-icon";
                  (this.cssSkill = ""
                    .concat(n, "-left ")
                    .concat(o.avatarBot ? "".concat(n).concat(i) : "")),
                    (this.cssUser = ""
                      .concat(n, "-right ")
                      .concat(o.avatarUser ? "".concat(n).concat(i) : ""));
                }
                return (
                  (e.prototype.render = function () {
                    var e = this.util,
                      t = this.element;
                    return (
                      t
                        ? (t.setAttribute("aria-live", "off"),
                          t.setAttribute("aria-hidden", "true"))
                        : (t = e.createDiv()),
                      (t.className = ""
                        .concat(this.cssPrefix, "-relative-timestamp ")
                        .concat(this.css)),
                      (this.element = t),
                      t
                    );
                  }),
                  (e.prototype.setLocale = function (e) {
                    if (((this.i18n = e), this.key))
                      switch (this.key) {
                        case c:
                        case l:
                          this.setTime(this.i18n[this.key]);
                          break;
                        case p:
                        case h:
                          this.setTime(
                            this.i18n[this.key].replace(
                              "{0}",
                              "".concat(this.counter)
                            )
                          );
                      }
                  }),
                  (e.prototype.setRelativeTime = function (e) {
                    var t = new Date().getTime() - e.getTime(),
                      n = Math.floor(t / 1e3),
                      o = Math.floor(n / 60),
                      i = Math.floor(o / 60),
                      r = Math.floor(i / 24),
                      a = Math.floor(r / 30),
                      s = Math.floor(a / 12);
                    s > 0
                      ? this.setYears(s)
                      : a > 0
                      ? this.setMonths(a)
                      : r > 0
                      ? this.setDays(r)
                      : i > 0
                      ? this.setHours(i)
                      : o > 0
                      ? this.setMinutes(o)
                      : this.setMoment(n);
                  }),
                  (e.prototype.refresh = function (e) {
                    (this.css =
                      e === o.SenderType.Skill ? this.cssSkill : this.cssUser),
                      (this.element.className = ""
                        .concat(this.cssPrefix, "-relative-timestamp ")
                        .concat(this.css)),
                      this.setNow();
                  }),
                  (e.prototype.remove = function () {
                    var e;
                    (null === (e = this.element) || void 0 === e
                      ? void 0
                      : e.parentElement) && this.element.remove();
                  }),
                  (e.prototype.setNow = function () {
                    this.runTimeout(c, 1e4, this.setMoment.bind(this));
                  }),
                  (e.prototype.setMoment = function (e) {
                    void 0 === e && (e = 10),
                      (e *= 1e3),
                      this.runTimeout(l, 6e4 - e, this.setMinutes.bind(this));
                  }),
                  (e.prototype.setMinutes = function (e) {
                    void 0 === e && (e = 1),
                      this.runTimer(
                        this.i18n,
                        p,
                        6e4,
                        60,
                        this.setHours.bind(this),
                        e
                      );
                  }),
                  (e.prototype.setHours = function (e) {
                    void 0 === e && (e = 1),
                      this.runTimer(
                        this.i18n,
                        h,
                        a,
                        24,
                        this.setDays.bind(this),
                        e
                      );
                  }),
                  (e.prototype.setDays = function (e) {
                    void 0 === e && (e = 1),
                      this.runTimer(
                        this.i18n,
                        "relTimeDay",
                        s,
                        30,
                        this.setMonths.bind(this),
                        e
                      );
                  }),
                  (e.prototype.setMonths = function (e) {
                    void 0 === e && (e = 1),
                      this.runTimer(
                        this.i18n,
                        "relTimeMon",
                        2592e6,
                        12,
                        this.setYears.bind(this),
                        e
                      );
                  }),
                  (e.prototype.setYears = function (e) {
                    void 0 === e && (e = 1),
                      this.runTimer(
                        this.i18n,
                        "relTimeYr",
                        31536e6,
                        60,
                        function () {},
                        e
                      );
                  }),
                  (e.prototype.runTimeout = function (e, t, n) {
                    this.resetTimer(),
                      this.setTime(this.i18n[e]),
                      (this.key = e),
                      (this.updateTimer = i(function () {
                        n();
                      }, t));
                  }),
                  (e.prototype.runTimer = function (e, t, n, o, i, a) {
                    var s = this;
                    void 0 === a && (a = 1),
                      this.resetTimer(),
                      this.setTime(e[t].replace("{0}", "".concat(a))),
                      (this.key = t),
                      (this.counter = a),
                      (this.updateTimer = r(function () {
                        a++,
                          (s.counter = a),
                          a > o
                            ? (clearInterval(s.updateTimer), i())
                            : s.setTime(e[t].replace("{0}", "".concat(a)));
                      }, n));
                  }),
                  (e.prototype.setTime = function (e) {
                    this.element.innerText = e;
                  }),
                  (e.prototype.resetTimer = function () {
                    clearTimeout(this.updateTimer),
                      clearInterval(this.updateTimer);
                  }),
                  e
                );
              })();
            t.RelativeTimestampComponent = u;
          },
          3357: function (e, t, n) {
            var o,
              i =
                (this && this.__extends) ||
                ((o = function (e, t) {
                  return (o =
                    Object.setPrototypeOf ||
                    ({ __proto__: [] } instanceof Array &&
                      function (e, t) {
                        e.__proto__ = t;
                      }) ||
                    function (e, t) {
                      for (var n in t)
                        Object.prototype.hasOwnProperty.call(t, n) &&
                          (e[n] = t[n]);
                    })(e, t);
                }),
                function (e, t) {
                  if ("function" != typeof t && null !== t)
                    throw new TypeError(
                      "Class extends value " +
                        String(t) +
                        " is not a constructor or null"
                    );
                  function n() {
                    this.constructor = e;
                  }
                  o(e, t),
                    (e.prototype =
                      null === t
                        ? Object.create(t)
                        : ((n.prototype = t.prototype), new n()));
                });
            Object.defineProperty(t, "__esModule", { value: !0 }),
              (t.applyHeadingWidth =
                t.createTableCell =
                t.TableMessageComponent =
                  void 0);
            var r = n(9070),
              a = n(5949),
              s = 100,
              c = (function (e) {
                function t() {
                  return (null !== e && e.apply(this, arguments)) || this;
                }
                return (
                  i(t, e),
                  (t.prototype.getContent = function () {
                    var t = this,
                      n = this.util,
                      o = this._payload,
                      i = p(o.headings),
                      r = "table-message",
                      s = n.createDiv(["".concat(r, "-wrapper")]),
                      c = n.createElement("table", [r]);
                    s.appendChild(c);
                    var h = n.createElement("tr", ["".concat(r, "-headings")]);
                    return (
                      i.forEach(function (e) {
                        var t = l(
                          n,
                          ["".concat(r, "-heading")],
                          e.width,
                          e.alignment
                        );
                        (t.innerText = e.label), h.appendChild(t);
                      }),
                      c.appendChild(h),
                      o.rows.forEach(function (e) {
                        var o = n.createElement("tr", ["".concat(r, "-row")]);
                        e.fields.forEach(function (e, s) {
                          var c = l(
                            n,
                            ["".concat(r, "-item")],
                            i[s].width,
                            e.alignment
                          );
                          if ("link" === e.displayType) {
                            var p = n.createDiv(),
                              h = n.createElement(
                                "a",
                                e.linkLabel ? [] : ["ellipsis"]
                              );
                            (h.href = e.value),
                              (h.innerText =
                                e.linkLabel || (0, a.skipHTTPS)(e.value) || ""),
                              h.setAttribute("target", "_blank"),
                              p.appendChild(h),
                              t.settings.linkHandler
                                ? (0, a.setEmbeddedLinksHandler)(
                                    p,
                                    t.settings.linkHandler
                                  )
                                : t.settings.openLinksInNewWindow &&
                                  (0, a.setLinksOpenInNewWindow)(p),
                              c.appendChild(h);
                          } else c.innerText = e.value || "";
                          o.appendChild(c);
                        }),
                          c.appendChild(o);
                      }),
                      e.prototype.getContent.call(this, s)
                    );
                  }),
                  t
                );
              })(r.C2SQLBaseMessageComponent);
            function l(e, t, n, o) {
              var i = e.createElement("td", t);
              return (
                (i.style.textAlign = o), (i.style.width = "".concat(n, "%")), i
              );
            }
            function p(e) {
              var t;
              if (
                e.every(function (e) {
                  return !e.width || (e.width >= 0 && e.width <= s);
                })
              ) {
                var n = 0,
                  o = 0;
                if (
                  (e.forEach(function (e) {
                    e.width ? (o += e.width) : n++;
                  }),
                  n)
                )
                  if (o < s) {
                    var i = (s - o) / n;
                    t = e.map(function (e) {
                      return e.width || (e.width = i), e;
                    });
                  } else t = h(e);
                else if (o === s) t = e;
                else {
                  var r = s / o;
                  t = e.map(function (e) {
                    return (e.width = e.width * r), e;
                  });
                }
              } else t = h(e);
              return t;
            }
            function h(e) {
              var t = s / e.length;
              return e.map(function (e) {
                return (e.width = t), e;
              });
            }
            (t.TableMessageComponent = c),
              (t.createTableCell = l),
              (t.applyHeadingWidth = p);
          },
          3538: function (e, t, n) {
            var o,
              i =
                (this && this.__extends) ||
                ((o = function (e, t) {
                  return (o =
                    Object.setPrototypeOf ||
                    ({ __proto__: [] } instanceof Array &&
                      function (e, t) {
                        e.__proto__ = t;
                      }) ||
                    function (e, t) {
                      for (var n in t)
                        Object.prototype.hasOwnProperty.call(t, n) &&
                          (e[n] = t[n]);
                    })(e, t);
                }),
                function (e, t) {
                  if ("function" != typeof t && null !== t)
                    throw new TypeError(
                      "Class extends value " +
                        String(t) +
                        " is not a constructor or null"
                    );
                  function n() {
                    this.constructor = e;
                  }
                  o(e, t),
                    (e.prototype =
                      null === t
                        ? Object.create(t)
                        : ((n.prototype = t.prototype), new n()));
                });
            Object.defineProperty(t, "__esModule", { value: !0 }),
              (t.TableFormMessageComponent = void 0);
            var r = n(9070),
              a = n(3357),
              s = n(3353),
              c = n(1389),
              l = n(5949),
              p = (function (e) {
                function t() {
                  return (null !== e && e.apply(this, arguments)) || this;
                }
                return (
                  i(t, e),
                  (t.prototype.getContent = function () {
                    var t = this,
                      n = this.util,
                      o = this._payload;
                    o.headings.push({ alignment: "center", label: "" });
                    var i = (0, a.applyHeadingWidth)(o.headings),
                      r = "table-message",
                      p = n.createDiv(["".concat(r, "-wrapper")]),
                      h = n.createElement("table", [r, "tableform-message"]);
                    p.appendChild(h);
                    var u = n.createElement("tr", ["".concat(r, "-headings")]);
                    return (
                      i.forEach(function (e) {
                        var t = (0, a.createTableCell)(
                          n,
                          ["".concat(r, "-heading")],
                          e.width,
                          e.alignment
                        );
                        (t.innerText = e.label), u.appendChild(t);
                      }),
                      h.appendChild(u),
                      (u.lastElementChild.style.width = "32px"),
                      o.rows.forEach(function (e, p) {
                        var u = n.createElement("tr", ["".concat(r, "-row")]);
                        e.fields.forEach(function (e, t) {
                          var o = (0, a.createTableCell)(
                            n,
                            ["".concat(r, "-item")],
                            i[t].width,
                            e.alignment
                          );
                          if ("link" === e.displayType) {
                            var s = n.createElement(
                              "a",
                              e.linkLabel ? [] : ["ellipsis"]
                            );
                            (s.href = e.value),
                              (s.innerText =
                                e.linkLabel || (0, l.skipHTTPS)(e.value) || ""),
                              o.appendChild(s);
                          } else o.innerText = e.value || "";
                          u.appendChild(o);
                        }),
                          o.formColumns > 2 && (o.formColumns = 2);
                        var d = o.forms[p],
                          g = (0, a.createTableCell)(n, [
                            "".concat(r, "-item"),
                            "button-cell",
                          ]),
                          f = n.createIconButton({
                            css: [
                              "".concat(r, "-item"),
                              "".concat(r, "-item-form-toggle"),
                            ],
                            icon: c.iconChevronDown,
                            iconCss: [],
                            title: d.title || "",
                          });
                        g.appendChild(f), u.appendChild(g);
                        var m = "none",
                          v = "rotate-180",
                          b = (0, s.getFormItem)(
                            n,
                            d.fields,
                            o.formColumns,
                            t.settings
                          );
                        n.addCSSClass(b, m);
                        var w = !1;
                        (u.onclick = function () {
                          w
                            ? (n.addCSSClass(b, m), n.removeCSSClass(f, v))
                            : (n.removeCSSClass(b, m), n.addCSSClass(f, v)),
                            (w = !w);
                        }),
                          h.appendChild(u),
                          h.appendChild(b);
                      }),
                      e.prototype.getContent.call(this, p)
                    );
                  }),
                  t
                );
              })(r.C2SQLBaseMessageComponent);
            t.TableFormMessageComponent = p;
          },
          1597: function (e, t, n) {
            var o,
              i =
                (this && this.__extends) ||
                ((o = function (e, t) {
                  return (o =
                    Object.setPrototypeOf ||
                    ({ __proto__: [] } instanceof Array &&
                      function (e, t) {
                        e.__proto__ = t;
                      }) ||
                    function (e, t) {
                      for (var n in t)
                        Object.prototype.hasOwnProperty.call(t, n) &&
                          (e[n] = t[n]);
                    })(e, t);
                }),
                function (e, t) {
                  if ("function" != typeof t && null !== t)
                    throw new TypeError(
                      "Class extends value " +
                        String(t) +
                        " is not a constructor or null"
                    );
                  function n() {
                    this.constructor = e;
                  }
                  o(e, t),
                    (e.prototype =
                      null === t
                        ? Object.create(t)
                        : ((n.prototype = t.prototype), new n()));
                });
            Object.defineProperty(t, "__esModule", { value: !0 }),
              (t.FeedbackComponent = void 0);
            var r = n(9297),
              a = n(523),
              s = n(1389),
              c = (function (e) {
                function t(t, n, o, i, r, a, s) {
                  var c = e.call(this, t, n, o, i, r, a, s) || this;
                  return (
                    (c.currentRating = 0),
                    (c.payloadActions = o.actions),
                    (c.ratingId = Date.now()),
                    c
                  );
                }
                return (
                  i(t, e),
                  (t.prototype.focusFirstAction = function () {
                    this.ratingActions[0].focus();
                  }),
                  (t.prototype.disableActions = function () {
                    this.setDisabled(!0), e.prototype.disableActions.call(this);
                  }),
                  (t.prototype.disablePostbacks = function () {
                    this.setDisabled(!0),
                      e.prototype.disablePostbacks.call(this);
                  }),
                  (t.prototype.enableActions = function () {
                    this.setDisabled(!1), e.prototype.enableActions.call(this);
                  }),
                  (t.prototype.enablePostbacks = function () {
                    this.setDisabled(!1),
                      e.prototype.enablePostbacks.call(this);
                  }),
                  (t.prototype.highlightRating = function (e) {
                    for (
                      var t = this.util, n = "active", o = 0;
                      o < this.actions.length;
                      o++
                    ) {
                      var i = o + 1;
                      "string" == typeof e && (e = this.getValidRating(e)),
                        (e && i <= e) || (0 === e && i <= this.currentRating)
                          ? t.addCSSClass(this.ratingActions[o], n)
                          : t.removeCSSClass(this.ratingActions[o], n);
                    }
                  }),
                  (t.prototype.getActions = function () {
                    var e = this,
                      t = this.util,
                      n = this.settings,
                      o = n.i18n[n.locale].ratingStar,
                      i = t.createDiv(["rating-wrapper"]);
                    (this.ratingActions = this.payloadActions.map(function (r) {
                      var a = t.createElement("input", [
                        "star-input",
                        "rating-hidden",
                      ]);
                      (a.id = "rating-"
                        .concat(r.label, "-")
                        .concat(e.ratingId)),
                        (a.type = "radio"),
                        (a.name = "rating-".concat(e.ratingId)),
                        (a.value = r.label);
                      var c = t.createElement("label", ["star-label"]);
                      (c.htmlFor = "rating-"
                        .concat(r.label, "-")
                        .concat(e.ratingId)),
                        c.setAttribute("data-rating", r.label);
                      var l = t.createElement("span", ["rating-hidden"]),
                        p = o.replace("{0}", "".concat(r.label));
                      l.innerText = p;
                      var h = (n.icons && n.icons.rating) || s.iconRating,
                        u = t.createImageIcon({
                          icon: h,
                          title: p,
                          iconCss: ["rating-star-icon"],
                        });
                      return (
                        c.appendChild(l),
                        c.appendChild(u),
                        (a.onfocus = function () {
                          a.disabled ||
                            (e.currentRating = e.getRatingStarsAndHighlight(a));
                        }),
                        (a.onkeydown = function (t) {
                          "Enter" === t.key && e.submitRating(r);
                        }),
                        (c.onclick = function () {
                          a.disabled ||
                            ((e.currentRating =
                              e.getRatingStarsAndHighlight(c)),
                            e.submitRating(r));
                        }),
                        (c.onmouseover = function () {
                          a.disabled || e.getRatingStarsAndHighlight(c);
                        }),
                        (c.onmouseleave = function () {
                          a.disabled || e.getRatingStarsAndHighlight(null);
                        }),
                        i.appendChild(a),
                        i.appendChild(c),
                        a
                      );
                    })),
                      this.currentRating &&
                        this.getRatingStarsAndHighlight(null);
                    var r = t.createDiv(["rating-root"]);
                    return r.appendChild(i), r;
                  }),
                  (t.prototype.setDisabled = function (e) {
                    this.ratingActions &&
                      this.ratingActions.forEach(function (t) {
                        t.disabled = e;
                      });
                  }),
                  (t.prototype.submitRating = function (e) {
                    var t = {
                      getPayload: function () {
                        return r.default.resolve(e.postback);
                      },
                      label: e.label,
                      type: e.type,
                    };
                    this.handleOnActionClick(t);
                  }),
                  (t.prototype.getRatingStarsAndHighlight = function (e) {
                    var t = 0;
                    if (e) {
                      var n = e.value
                        ? e.value
                        : null == e
                        ? void 0
                        : e.getAttribute("data-rating");
                      t = n ? parseInt(n, 10) : 0;
                    }
                    return this.highlightRating(t), t;
                  }),
                  (t.prototype.getValidRating = function (e) {
                    var t = 0;
                    if (e.match(/^\d+$/)) {
                      var n = parseInt(e, 10);
                      n > 0 && n <= this.actions.length && (t = n);
                    }
                    return t;
                  }),
                  t
                );
              })(a.TextMessageComponent);
            t.FeedbackComponent = c;
          },
          523: function (e, t, n) {
            var o,
              i =
                (this && this.__extends) ||
                ((o = function (e, t) {
                  return (o =
                    Object.setPrototypeOf ||
                    ({ __proto__: [] } instanceof Array &&
                      function (e, t) {
                        e.__proto__ = t;
                      }) ||
                    function (e, t) {
                      for (var n in t)
                        Object.prototype.hasOwnProperty.call(t, n) &&
                          (e[n] = t[n]);
                    })(e, t);
                }),
                function (e, t) {
                  if ("function" != typeof t && null !== t)
                    throw new TypeError(
                      "Class extends value " +
                        String(t) +
                        " is not a constructor or null"
                    );
                  function n() {
                    this.constructor = e;
                  }
                  o(e, t),
                    (e.prototype =
                      null === t
                        ? Object.create(t)
                        : ((n.prototype = t.prototype), new n()));
                });
            Object.defineProperty(t, "__esModule", { value: !0 }),
              (t.TextMessageComponent = void 0);
            var r = n(5949),
              a = n(3145),
              s = (function (e) {
                function t(t, n, o, i, r, a, s) {
                  var c = e.call(this, t, n, o, i, r, a, s) || this;
                  return (c._text = o.text), c;
                }
                return (
                  i(t, e),
                  (t.prototype.getContent = function () {
                    var t = this.settings,
                      n = this.util,
                      o = n.createDiv();
                    return (
                      (o.innerHTML = n.linkify(this._text, {
                        emHTML: this.side === a.MESSAGE_SIDE.LEFT,
                        emVideo: !0,
                      })),
                      t.linkHandler
                        ? (0, r.setEmbeddedLinksHandler)(o, t.linkHandler)
                        : t.openLinksInNewWindow &&
                          (0, r.setLinksOpenInNewWindow)(o),
                      e.prototype.getContent.call(this, o)
                    );
                  }),
                  t
                );
              })(a.MessageComponent);
            t.TextMessageComponent = s;
          },
          7332: function (e, t) {
            Object.defineProperty(t, "__esModule", { value: !0 }),
              (t.TypingIndicatorComponent = void 0);
            var n = (function () {
              function e(e, t, n) {
                (this.side = e),
                  (this.settings = t),
                  (this.util = n),
                  (this.element = this.render()),
                  (this.visible = !1);
              }
              return (
                (e.prototype.append = function (e) {
                  var t = this;
                  this.isVisible() ||
                    (e.appendChild(this.element),
                    (this.visible = !0),
                    this.timeoutID && clearTimeout(this.timeoutID),
                    (this.timeoutID = window.setTimeout(function () {
                      t.remove();
                    }, 1e3 * this.settings.typingIndicatorTimeout)));
                }),
                (e.prototype.remove = function () {
                  this.isVisible() &&
                    (this.element.remove(), (this.visible = !1));
                }),
                (e.prototype.isVisible = function () {
                  return this.visible;
                }),
                (e.prototype.render = function () {
                  var e,
                    t = this.util,
                    n = this.settings,
                    o = t.createDiv(["typing-cue-wrapper"]),
                    i = n.icons.avatarBot;
                  if (
                    (i &&
                      (e = t.createImageIcon({
                        icon: i,
                        iconCss: ["message-icon"],
                        title: "",
                      })),
                    n.icons.typingIndicator)
                  ) {
                    var r = n.icons.typingIndicator,
                      a = n.i18n[n.locale].typingIndicator,
                      s = t.createImageIcon({ icon: r, title: a });
                    (s.style.height = n.chatBubbleIconHeight || s.style.height),
                      (s.style.width = n.chatBubbleIconWidth || s.style.width),
                      o.appendChild(s);
                  } else {
                    var c = t.createDiv(["typing-cue"]);
                    o.appendChild(c);
                  }
                  return t.getMessageBlock(this.side, o, e);
                }),
                e
              );
            })();
            t.TypingIndicatorComponent = n;
          },
          2466: function (e, t, n) {
            var o =
              (this && this.__assign) ||
              function () {
                return (o =
                  Object.assign ||
                  function (e) {
                    for (var t, n = 1, o = arguments.length; n < o; n++)
                      for (var i in (t = arguments[n]))
                        Object.prototype.hasOwnProperty.call(t, i) &&
                          (e[i] = t[i]);
                    return e;
                  }).apply(this, arguments);
              };
            Object.defineProperty(t, "__esModule", { value: !0 });
            var i = n(9174),
              r = n(1389),
              a = n(5949),
              s = [
                "no-referrer",
                "no-referrer-when-downgrade",
                "origin",
                "origin-when-cross-origin",
                "same-origin",
                "strict-origin",
                "strict-origin-when-cross-origin",
                "unsafe-url",
              ],
              c = [
                "allow-downloads-without-user-activation",
                "allow-downloads",
                "allow-forms",
                "allow-modals",
                "allow-orientation-lock",
                "allow-pointer-lock",
                "allow-popups",
                "allow-popups-to-escape-sandbox",
                "allow-presentation",
                "allow-same-origin",
                "allow-scripts",
                "allow-storage-access-by-user-activation",
                "allow-top-navigation",
                "allow-top-navigation-by-user-activation",
              ],
              l = "none",
              p = "webview-container",
              h = "".concat(p, "-open"),
              u = "".concat(p, "-close"),
              d = (function () {
                function e(e, t, n) {
                  (this.util = t),
                    (this.settings = n),
                    (this.heightRatio = 0.8),
                    (this.props = {
                      closeButtonIcon: r.iconClose,
                      closeButtonType: "icon",
                      errorInfoBar: !0,
                      referrerPolicy: "no-referrer-when-downgrade",
                      sandbox: [],
                      size: "tall",
                    }),
                    (this.isOpen = !1),
                    (this.isErrorViewOpen = !1),
                    this.setProps(e || {});
                }
                return (
                  (e.prototype.setProps = function (e) {
                    Array.isArray(e.sandbox) &&
                      e.sandbox.length &&
                      (e.sandbox = e.sandbox
                        .map(function (e) {
                          return e.toLowerCase();
                        })
                        .filter(function (e) {
                          return -1 !== c.indexOf(e);
                        }));
                    var t,
                      n = o(o({}, this.props), e);
                    n.closeButtonIcon ||
                      (n.closeButtonIcon = this.props.closeButtonIcon),
                      n.closeButtonType || (n.closeButtonType = "icon"),
                      n.size || (n.size = "tall"),
                      (t = n.referrerPolicy),
                      s.indexOf(null == t ? void 0 : t.toLowerCase()) >= 0 ||
                        (n.referrerPolicy = "no-referrer-when-downgrade"),
                      (this.heightRatio = "full" === n.size ? 1 : 0.8),
                      (this.props = n),
                      (this.isOpen = !1),
                      (this.isErrorViewOpen = !1);
                  }),
                  (e.prototype.open = function (e) {
                    var t = this;
                    if (this.component) {
                      var n = this.util;
                      (this.component.style.height = "".concat(
                        100 * this.heightRatio,
                        "%"
                      )),
                        n.removeCSSClass(this.component, u, l),
                        n.addCSSClass(this.component, h),
                        this.component.insertBefore(
                          this.loadingIndicator,
                          this.webView
                        ),
                        (this.webView.onload = function () {
                          t.loadingIndicator.remove(),
                            n.removeCSSClass(t.webView, l);
                        }),
                        this.props.title || (this.title.textContent = e),
                        this.props.errorInfoBar &&
                          setTimeout(function () {
                            t.isOpen &&
                              !t.isErrorViewOpen &&
                              ((t.errorView = t.createErrorView()),
                              e && (t.errorAltLink.href = e),
                              n.removeCSSClass(t.errorView, l),
                              t.component.appendChild(t.errorView),
                              (t.isErrorViewOpen = !0));
                          }, 1e3),
                        (this.isOpen = !0);
                    }
                  }),
                  (e.prototype.close = function () {
                    var e = this,
                      t = this.util;
                    (this.isOpen = !1),
                      t.removeCSSClass(this.component, h),
                      t.addCSSClass(this.component, u),
                      this.removeErrorView(),
                      this.webView.setAttribute("src", ""),
                      setTimeout(function () {
                        t.addCSSClass(e.component, l),
                          t.removeCSSClass(e.webView, l);
                      }, 400);
                  }),
                  (e.prototype.render = function () {
                    var e = this,
                      t = this.util;
                    (this.component = t.createDiv(["webview-container"])),
                      (this.header = t.createDiv([
                        "header",
                        "webview-header",
                        "flex",
                      ])),
                      (this.title = t.createDiv([
                        "title",
                        "webview-title",
                        "ellipsis",
                      ])),
                      (this.closeButton = t.createButton([
                        "webview-button-close",
                        "title",
                      ])),
                      (this.loadingIndicator = this.createLoadingIndicator()),
                      (this.webView = t.createElement("iframe", ["webview"])),
                      (this.webView.name = "".concat(
                        this.settings.name,
                        "-webview"
                      ));
                    var n = this.props;
                    (this.webView.title = n.accessibilityTitle),
                      n.title && (this.title.textContent = n.title),
                      (this.closeButton.innerHTML = "");
                    var o = t.createIconButton({
                      css: ["header-icon"],
                      icon: n.closeButtonIcon,
                      iconCss: [
                        (0, a.isSVG)(n.closeButtonIcon)
                          ? "header-button-icon"
                          : "header-button-img-icon",
                      ],
                      title: n.closeButtonLabel,
                    });
                    switch (n.closeButtonType) {
                      case "icon":
                        this.closeButton = o;
                        break;
                      case "label":
                        this.closeButton.appendChild(
                          document.createTextNode(n.closeButtonLabel)
                        );
                        break;
                      case "iconWithLabel":
                        (this.closeButton = o),
                          this.closeButton.appendChild(
                            document.createTextNode(n.closeButtonLabel)
                          );
                    }
                    return (
                      this.webView.setAttribute(
                        "referrerpolicy",
                        n.referrerPolicy
                      ),
                      this.props.sandbox.length &&
                        this.props.sandbox.forEach(function (t) {
                          return e.webView.sandbox.add(t);
                        }),
                      (this.closeButton.title = n.closeButtonLabel),
                      t.addCSSClass(this.component, l),
                      (this.closeButton.onclick = function () {
                        e.close();
                      }),
                      this.header.appendChild(this.title),
                      this.header.appendChild(this.closeButton),
                      this.component.appendChild(this.header),
                      this.component.appendChild(this.webView),
                      this.component
                    );
                  }),
                  (e.prototype.createLoadingIndicator = function () {
                    return new i.SpinnerComponent(this.util).render();
                  }),
                  (e.prototype.createErrorView = function () {
                    var e = this.util,
                      t = e.createDiv(["webview-error", "flex"]);
                    (this.errorInfoText = e.createDiv(["webview-error-text"])),
                      t.appendChild(this.errorInfoText),
                      this.setErrorTextWithLink(this.props.errorInfoText);
                    var n = e.createIconButton({
                      css: [
                        "webview-error-button-close",
                        "webview-button-close",
                      ],
                      icon: this.props.closeButtonIcon,
                      iconCss: [
                        (0, a.isSVG)(this.props.closeButtonIcon)
                          ? "header-button-icon"
                          : "header-button-img-icon",
                      ],
                      title: this.props.errorInfoDismissLabel,
                    });
                    return (
                      (n.onclick = this.removeErrorView.bind(this)),
                      t.appendChild(n),
                      t
                    );
                  }),
                  (e.prototype.setErrorTextWithLink = function (e) {
                    var t,
                      n,
                      o = this.util;
                    e = (0, a.sanitizeText)(e);
                    var i = /\{0\}(.*)\{\/0\}/g,
                      r =
                        null === (t = i.exec(e)) || void 0 === t
                          ? void 0
                          : t[1];
                    if (r) {
                      var s = o.createAnchor("", r, ["webview-alt-link"]);
                      n = e.replace((0, a.resetRegex)(i), s.outerHTML);
                    } else
                      n = o.createAnchor("", e, ["webview-alt-link"]).outerHTML;
                    (this.errorInfoText.innerHTML = n),
                      (this.errorAltLink =
                        this.errorInfoText.querySelector("a"));
                  }),
                  (e.prototype.removeErrorView = function () {
                    var e = this,
                      t = this.util;
                    this.isErrorViewOpen &&
                      (t.addCSSClass(this.errorView, l),
                      setTimeout(function () {
                        e.component.removeChild(e.errorView),
                          (e.isErrorViewOpen = !1);
                      }, 600));
                  }),
                  e
                );
              })();
            t.default = d;
          },
          9767: function (e, t, n) {
            var o =
              (this && this.__assign) ||
              function () {
                return (o =
                  Object.assign ||
                  function (e) {
                    for (var t, n = 1, o = arguments.length; n < o; n++)
                      for (var i in (t = arguments[n]))
                        Object.prototype.hasOwnProperty.call(t, i) &&
                          (e[i] = t[i]);
                    return e;
                  }).apply(this, arguments);
              };
            Object.defineProperty(t, "__esModule", { value: !0 }),
              n(9594),
              n(6400),
              n(8952);
            var i = n(9297),
              r = n(7496),
              a = n(8674),
              s = n(5949),
              c = n(7214),
              l = n(8798),
              p = n(1001),
              h = n(4534),
              u = n(4733),
              d = n(6166),
              g = n(6137),
              f = n(5081),
              m = n(1489),
              v = {
                avatarAgent: "agentAvatar",
                avatarBot: "botIcon",
                avatarUser: "personIcon",
                fileAudio: "audioIcon",
                fileImage: "imageIcon",
                fileGeneric: "fileIcon",
                fileVideo: "videoIcon",
                clearHistory: "clearMessageIcon",
                close: void 0,
                collapse: "closeIcon",
                download: "downloadIcon",
                error: "errorIcon",
                expandImage: "expandImageIcon",
                keyboard: "keyboardIcon",
                logo: "logoIcon",
                launch: "botButtonIcon",
                mic: "micIcon",
                rating: void 0,
                send: "sendIcon",
                shareMenu: "attachmentIcon",
                shareMenuAudio: void 0,
                shareMenuFile: void 0,
                shareMenuLocation: void 0,
                shareMenuVisual: void 0,
                ttsOff: "audioResponseOffIcon",
                ttsOn: "audioResponseOnIcon",
                typingIndicator: "chatBubbleIcon",
              };
            function b(e) {
              for (var t = {}, n = 0, o = Object.keys(e); n < o.length; n++) {
                var i = o[n];
                t[i.toLowerCase()] = e[i];
              }
              return t;
            }
            function w(e, t) {
              var n = o(o({}, e), t);
              if (t.i18n && Object.keys(t.i18n).length) {
                (e.i18n = b(e.i18n)), (t.i18n = b(t.i18n));
                var i = new Set();
                Object.keys(e.i18n).forEach(function (e) {
                  i.add(e);
                }),
                  Object.keys(t.i18n).forEach(function (e) {
                    i.add(e);
                  }),
                  (n.i18n = {}),
                  i.forEach(function (i) {
                    n.i18n[i] = o(o(o({}, e.i18n.en), e.i18n[i]), t.i18n[i]);
                  });
              }
              return (
                (n.colors = o(o({}, e.colors), t.colors)),
                (n.userId =
                  t.userId ||
                  "user"
                    .concat(Math.floor(1e4 + 9e4 * Math.random()))
                    .concat(Date.now() % 1e5)),
                (n.icons = (function (e) {
                  var t = e.icons || {};
                  for (var n in v) {
                    var o = n,
                      i = v[o];
                    o in t ? (t[o] = t[o]) : i in e && (t[o] = e[i]);
                  }
                  return t;
                })(n)),
                (n.locale = (0, s.configureLocale)(n.locale, n.i18n)),
                n
              );
            }
            function y(e, t) {
              var n,
                o,
                v,
                b,
                T,
                A = this,
                I = w(g.defaultSettings, e),
                E = !1,
                k = I.name,
                M = new m.DOMUtil(I),
                L = new l.Logger("main"),
                O = new d.WebCore({
                  URI: I.URI,
                  channelId: I.channelId,
                  userId: I.userId,
                  isTLS: I.enableSecureConnection,
                  channel: I.channel,
                  enableAttachment: I.enableAttachment,
                  enableAttachmentSecurity: I.enableAttachmentSecurity,
                  isLongPoll: I.enableLongPolling,
                  isTTS: I.enableBotAudioResponse,
                  TTSService: I.ttsService,
                  tokenGenerator: I.clientAuthEnabled ? t : null,
                  recognitionLocale: I.speechLocale,
                });
              I.enableBotAudioResponse &&
                (I.ttsService || (I.ttsService = O.getTTSService()),
                I.skillVoices && O.setTTSVoice(I.skillVoices));
              var P = (0, s.getValues)(d.RecognitionLocale),
                D = function (e) {
                  for (var t = [], n = 1; n < arguments.length; n++)
                    t[n - 1] = arguments[n];
                  1 === t.length
                    ? L.error(
                        "Parameter " +
                          t +
                          " was not passed for " +
                          e +
                          " call. No action processed."
                      )
                    : L.error(
                        "Parameters " +
                          t.join(", ") +
                          " were not passed for " +
                          e +
                          " call. No action processed."
                      );
                },
                R = function (e) {
                  b.trigger(r.ChatEvent.MESSAGE_SENT, e),
                    b.trigger(r.ChatEvent.MESSAGE, e);
                },
                B = function (e) {
                  b.trigger(r.ChatEvent.MESSAGE_RECEIVED, e),
                    b.trigger(r.ChatEvent.MESSAGE, e);
                },
                N = function (e) {
                  b.trigger(r.ChatEvent.NETWORK, e);
                },
                V = function (e) {
                  var t = T.innerText;
                  T.innerText = (0, s.updateCSSVar)(
                    t,
                    "".concat(e, "px"),
                    "--width-full-screen"
                  );
                },
                z = function (e) {
                  if (
                    ((n = new c.WidgetComponent(
                      I,
                      M,
                      A.openChat.bind(A),
                      A.closeChat.bind(A),
                      H.bind(A),
                      B.bind(A),
                      R.bind(A),
                      A.getUnreadMessagesCount.bind(A),
                      N.bind(A),
                      O,
                      b
                    )),
                    e)
                  )
                    try {
                      var t = document.getElementById(I.targetElement);
                      n.embedInElement(I.targetElement),
                        V(t.clientWidth),
                        window.addEventListener(
                          "resize",
                          (0, s.debounce)(function () {
                            V(t.clientWidth);
                          }, 500)
                        );
                    } catch (e) {
                      L.error("Target Element not specified", e);
                    }
                  else {
                    n.appendToElement(document.body);
                    var i = n.element;
                    S(i, k, M),
                      window.addEventListener(
                        "resize",
                        (0, s.debounce)(function () {
                          S(i, k, M);
                        }, 500)
                      );
                  }
                  o = n.chatWidgetDiv;
                  var r = I.width;
                  !e &&
                    r &&
                    ((o.style.width = r), V(r.substring(0, r.length - 2)));
                },
                F = function (e) {
                  var t = I.colors;
                  if (t) {
                    var n = Object.keys(t);
                    n.forEach(function (o) {
                      "text" === o &&
                        (-1 === n.indexOf("botText") &&
                          (e = (0, s.updateCSSVar)(
                            e,
                            t[o],
                            "--color-bot-text"
                          )),
                        -1 === n.indexOf("userText") &&
                          (e = (0, s.updateCSSVar)(
                            e,
                            t[o],
                            "--color-user-text"
                          )));
                      var i = "--color-".concat(
                        o.replace(/([A-Z&])/g, "-$1").toLowerCase()
                      );
                      e = (0, s.updateCSSVar)(e, t[o], i);
                    });
                  }
                  return e;
                },
                U = function () {
                  b.trigger(r.ChatEvent.READY), (U = function () {});
                };
              (this.connect = function (e) {
                var t,
                  n = void 0 === e ? {} : e,
                  o = n.URI,
                  i = n.channelId,
                  r = n.userId;
                return (
                  o || i || r
                    ? ((function (e, t, n) {
                        "string" == typeof e && e.length && (I.URI = e),
                          "string" == typeof t && t.length && (I.channelId = t),
                          "string" == typeof n && n.length && (I.userId = n);
                      })(o, i, r),
                      (t = O.connect({ URI: o, channelId: i, userId: r })))
                    : (t = O.connect()),
                  t
                    .then(function () {
                      U();
                    })
                    .catch(function () {
                      U();
                    }),
                  t
                );
              }),
                (this.disconnect = function () {
                  return (
                    I.enableSpeech && A.stopVoiceRecording(),
                    I.enableBotAudioResponse && A.cancelTTS(),
                    O.disconnect()
                  );
                }),
                (this.isConnected = function () {
                  return O.isConnected();
                }),
                (this.openChat = function () {
                  n.isOpen || (n.showChat(), E && (A.connect(), (E = !1))),
                    b.trigger(r.ChatEvent.WIDGET_OPENED);
                }),
                (this.closeChat = function () {
                  n.isOpen && n.onClose(), b.trigger(r.ChatEvent.WIDGET_CLOSED);
                }),
                (this.endChat = function () {
                  A.isConnected() && n.sendExitEvent();
                });
              var H = function () {
                n.isOpen && A.closeChat(),
                  A.disconnect(),
                  A.clearConversationHistory(),
                  (E = !0),
                  b.trigger(r.ChatEvent.CHAT_END);
              };
              (this.isChatOpened = function () {
                return n.isOpen;
              }),
                (this.destroy = function () {
                  for (var e in (A.disconnect(),
                  A.closeChat(),
                  n.remove(),
                  document && T && T.remove(),
                  b.trigger(r.ChatEvent.DESTROY),
                  A.off(),
                  A))
                    A[e] && delete A[e];
                }),
                (this.on = function (e, t) {
                  b.bind(e, t);
                }),
                (this.off = function (e, t) {
                  b.unbind(e, t);
                }),
                (this.sendAttachment = function (e) {
                  if (e) return n.uploadFile(e);
                  D("sendAttachment", "file");
                }),
                (this.sendMessage = function (e, t) {
                  return e
                    ? n.sendMessage(e, t)
                    : (D("sendMessage", "message"), !1);
                }),
                (this.updateUser = function (e) {
                  if (e)
                    return O.updateUser(e, {
                      sdkMetadata: { version: h.SDK_VERSION },
                    });
                  D("updateUser", "userDetails");
                }),
                (this.setSkillVoices = function (e) {
                  if (!I.ttsService) return _();
                  var t = [];
                  return (
                    e &&
                    !Array.isArray(e) &&
                    "string" == typeof (null == e ? void 0 : e.lang)
                      ? (t = [e])
                      : Array.isArray(e) && (t = e),
                    A.setTTSVoice(t)
                  );
                }),
                (this.setTTSService = function (e) {
                  var t = (function (e) {
                      return (
                        e &&
                        (0, f.isFunction)(e.speak) &&
                        (0, f.isFunction)(e.cancel) &&
                        (0, f.isFunction)(e.getVoice) &&
                        (0, f.isFunction)(e.getVoices) &&
                        (0, f.isFunction)(e.setVoice)
                      );
                    })(e),
                    o = I.ttsService;
                  o && (null == o || o.cancel()),
                    t
                      ? ((I.ttsService = e),
                        O.setTTSService(e),
                        (I.enableBotAudioResponse = !0),
                        (0, s.isAnyVoiceAvailable)(e, I.skillVoices).then(
                          function (t) {
                            t || (I.skillVoices = []);
                            var n = (0, s.syncTTSLocaleIfUnavailable)({
                              hasRecognition: I.enableSpeech,
                              hasSynthesis: I.enableBotAudioResponse,
                              recognitionLocale: I.speechLocale,
                              synthesisLocales: I.skillVoices,
                            });
                            e.setVoice(n), (I.skillVoices = n);
                          }
                        ))
                      : (I.ttsService = null),
                    n && n.refreshTTS();
                }),
                (this.getTTSVoices = function () {
                  return O.getTTSVoices();
                }),
                (this.setTTSVoice = function (e) {
                  var t = I.ttsService;
                  return t
                    ? (0, s.isAnyVoiceAvailable)(t, I.skillVoices).then(
                        function (t) {
                          return (
                            (I.skillVoices = (0, s.syncTTSLocaleIfUnavailable)({
                              hasRecognition: I.enableSpeech,
                              hasSynthesis: I.enableBotAudioResponse,
                              isReset: t,
                              recognitionLocale: I.speechLocale,
                              synthesisLocales: e,
                            })),
                            O.setTTSVoice(e).catch(function () {
                              return _();
                            })
                          );
                        }
                      )
                    : _();
                }),
                (this.getTTSVoice = function () {
                  try {
                    return O.getTTSVoice();
                  } catch (e) {
                    throw Error(x);
                  }
                }),
                (this.speakTTS = function (e) {
                  O.speakTTS(e, I.i18n[I.locale]);
                }),
                (this.cancelTTS = function () {
                  O.cancelTTS();
                }),
                (this.setPrimaryChatLanguage = function (e) {
                  if (null !== e && "string" != typeof e)
                    throw Error(
                      "Please pass a language string or null as argument"
                    );
                  A.isConnected()
                    ? n.setPrimaryChatLanguage(e)
                    : L.error(
                        "Not connected. Can not call setPrimaryChatLanguage."
                      );
                }),
                (this.setDelegate = function (e) {
                  I.delegate = e;
                }),
                (this.getConversationHistory = function () {
                  var e = n.getMessages();
                  return {
                    messages: e,
                    messagesCount: e.length,
                    unreadCount: A.getUnreadMessagesCount(),
                    userId: I.userId,
                  };
                }),
                (this.clearConversationHistory = function (e, t) {
                  void 0 === t && (t = !0),
                    e && "string" != typeof e
                      ? L.error(
                          "Argument passed in clearConversationHistory() is not of type string. Returning without execution."
                        )
                      : ((e && 0 !== e.length) || (e = I.userId),
                        t && e === I.userId
                          ? n.clearConversationHistory()
                          : n.clearMessages(e, p.StorageType.LOCAL));
                }),
                (this.clearAllConversationsHistory = function (e) {
                  void 0 === e && (e = !0),
                    n.clearAllMessage(),
                    e && n.clearConversationHistory();
                }),
                (this.getSuggestions = function (e) {
                  return I.enableAutocomplete
                    ? e
                      ? "string" != typeof e && "number" != typeof e
                        ? i.default.reject(
                            "Invalid query parameter type passed for the getSuggestions call."
                          )
                        : n.getSuggestions(e)
                      : i.default.reject(
                          "No query parameter passed for the getSuggestions call."
                        )
                    : i.default.reject("Autocomplete suggestions not enabled.");
                }),
                (this.startVoiceRecording = function (e, t, n) {
                  return I.enableSpeech
                    ? e
                      ? t
                        ? O.startRecognition({
                            onRecognitionText: function (t) {
                              e(t.message);
                            },
                            onAnalyserReady:
                              null == n ? void 0 : n.onAnalyserReady,
                            onVisualData:
                              null == n ? void 0 : n.onAnalyserFrequencies,
                            onSpeechNetworkChange: t,
                          })
                        : i.default.reject(
                            new Error(
                              "Second callback parameter, onSpeechNetworkChange not provided. Can not start recording"
                            )
                          )
                      : i.default.reject(
                          new Error(
                            "First callback parameter, onSpeechRecognition not provided. Can not start recording."
                          )
                        )
                    : i.default.reject(
                        new Error(
                          "Speech-to-text feature is not enabled. Initialize the widget with enableSpeech: true to use the service."
                        )
                      );
                }),
                (this.stopVoiceRecording = function () {
                  if (!I.enableSpeech)
                    throw new Error(
                      "Speech-to-text feature is not enabled. Speech recognition service is not running."
                    );
                  return O.stopRecognition();
                }),
                (this.setSpeechLocale = function (e) {
                  if (!I.enableSpeech) return !1;
                  e = e.toLowerCase();
                  var t = P.indexOf(e) >= 0;
                  if (
                    ((I.speechLocale = e),
                    O.setRecognitionLocale(e),
                    n.setVoiceRecognitionService(t),
                    t && I.enableBotAudioResponse)
                  ) {
                    var o = (0, s.syncTTSLocaleIfUnavailable)({
                      hasRecognition: I.enableSpeech,
                      hasSynthesis: I.enableBotAudioResponse,
                      recognitionLocale: I.speechLocale,
                      synthesisLocales: I.skillVoices,
                    });
                    o !== I.skillVoices &&
                      ((I.skillVoices = o), o.length && O.setTTSVoice(o));
                  }
                  return t;
                }),
                (this.getUnreadMessagesCount = function () {
                  if (I.enableHeadless) return 0;
                  var e = n.getUnreadMsgsCount();
                  return (
                    e !== v && ((v = e), b.trigger(r.ChatEvent.UNREAD, e)), e
                  );
                }),
                (this.setAllMessagesAsRead = function () {
                  I.enableHeadless ||
                    (A.getUnreadMessagesCount(), n.updateNotificationBadge(0));
                }),
                (this.showTypingIndicator = function () {
                  if (!I.showTypingIndicator)
                    throw new Error(
                      "Typing indicator is configured not to be shown."
                    );
                  if (I.enableHeadless)
                    throw new Error(
                      "Typing indicator cannot be shown in headless mode."
                    );
                  A.isConnected() && n.showTypingIndicator();
                }),
                (this.setWebViewConfig = function (e) {
                  if (I.enableHeadless)
                    throw new Error(
                      "WebView cannot be configured in headless mode."
                    );
                  n.refreshWebView(e);
                }),
                (this.setUserInputMessage = function (e) {
                  if (I.enableHeadless)
                    throw new Error(
                      "User input cannot be set in headless mode."
                    );
                  n.setUserInputMessage(e);
                }),
                (this.setUserInputPlaceholder = function (e) {
                  if (I.enableHeadless)
                    throw new Error(
                      "Placeholder cannot be set in headless mode."
                    );
                  e
                    ? n.setUserInputPlaceholder(e)
                    : D("setUserInputPlaceholder", "placeholder text");
                }),
                (this.setHeight = function (e) {
                  e
                    ? o && ((o.style.height = e), (I.height = e))
                    : D("setHeight", "height");
                }),
                (this.setWidth = function (e) {
                  if (e) {
                    var t = o;
                    t && ((t.style.width = e), (I.width = e), V(t.clientWidth));
                  } else D("setWidth", "width");
                }),
                (this.setSize = function (e, t) {
                  if (e || t) {
                    var n = o;
                    n &&
                      ((n.style.width = e),
                      (n.style.height = t),
                      (I.width = e),
                      (I.height = t),
                      V(n.clientWidth));
                  } else D("setSize", "width", "height");
                }),
                (this.setMessagePadding = function (e) {
                  if (e)
                    for (
                      var t = 0,
                        n = document.getElementsByClassName(
                          "".concat(k, "-message-bubble")
                        );
                      t < n.length;
                      t++
                    )
                      (n[t].style.padding = e), (I.messagePadding = e);
                  else D("setMessagePadding", "padding");
                }),
                (this.setChatBubbleIconHeight = function (e) {
                  if (e)
                    for (
                      var t = 0,
                        n = document.getElementsByClassName(
                          "".concat(k, "-chat-bubble")
                        );
                      t < n.length;
                      t++
                    )
                      (n[t].style.height = e), (I.height = e);
                  else D("setChatBubbleIconHeight", "height");
                }),
                (this.setChatBubbleIconWidth = function (e) {
                  if (e)
                    for (
                      var t = 0,
                        n = document.getElementsByClassName(
                          "".concat(k, "-chat-bubble")
                        );
                      t < n.length;
                      t++
                    )
                      (n[t].style.width = e), (I.width = e);
                  else D("setChatBubbleIconWidth", "width");
                }),
                (this.setChatBubbleIconSize = function (e, t) {
                  if (e || !t)
                    for (
                      var n = 0,
                        o = document.getElementsByClassName(
                          "".concat(k, "-chat-bubble")
                        );
                      n < o.length;
                      n++
                    ) {
                      var i = o[n];
                      (i.style.width = e),
                        (i.style.height = t),
                        (I.width = e),
                        (I.height = t);
                    }
                  else D("setChatBubbleIconSize", "width", "height");
                });
              var j = ".left",
                W = ".message-",
                G = "".concat(W, "bubble"),
                Y =
                  ".wrapper,"
                    .concat(j, " ")
                    .concat(G, ",")
                    .concat(j, " ")
                    .concat(W, "header,") +
                  ""
                    .concat(j, " ")
                    .concat(W, "footer, ")
                    .concat(j, " .card,.right ")
                    .concat(G);
              (this.setFont = function (e) {
                e
                  ? (C("".concat(Y, "{font:").concat(e, "}"), T, k),
                    (I.font = e))
                  : D("setFont", "font");
              }),
                (this.setFontFamily = function (e) {
                  if (e) {
                    var t = ".action-postback",
                      n =
                        "".concat(Y, ",").concat(W, "actions ").concat(t, ",") +
                        ".card-actions "
                          .concat(t, ",")
                          .concat(W, "global-actions ")
                          .concat(t);
                    C("".concat(n, "{font-family:").concat(e, "}"), T, k),
                      (I.fontFamily = e);
                  } else D("setFontFamily", "fontFamily");
                }),
                (this.setFontSize = function (e) {
                  e
                    ? C("".concat(Y, "{font-size:").concat(e, "}"), T, k)
                    : D("setFontSize", "fontSize");
                }),
                (this.setTextColor = function (e) {
                  e
                    ? C("".concat(Y, "{color:").concat(e, " !important}"), T, k)
                    : D("setTextColor", "color");
                }),
                (this.setTextColorLight = function (e) {
                  e
                    ? (C(
                        ".card-description{color:".concat(e, " !important}"),
                        T,
                        k
                      ),
                      (I.colors.textLight = e))
                    : D("setTextColor", "color");
                }),
                (b = (0, a.generateEventDispatcher)()),
                (function () {
                  if (
                    (L.debug("onLoad", "load chat widget"),
                    "undefined" != typeof window)
                  ) {
                    var e = !1,
                      t = document.head.children,
                      n = document.createElement("style"),
                      o = I.embedded
                        ? u.style
                        : (function (e, t) {
                            if (!t) return e;
                            var n = [];
                            ["bottom", "left", "right", "top"].forEach(
                              function (e) {
                                var o = t[e];
                                o && n.push("".concat(e, ": ").concat(o));
                              }
                            );
                            var o = ".wrapper{".concat(n.join(";"), "}");
                            return e + o;
                          })(u.style, I.position);
                    n.appendChild(
                      document.createTextNode(
                        F(
                          o.replace(
                            /(\.)([a-zA-Z_-]+)(?=[^}]+{)/gi,
                            "$1".concat(k, "-$2")
                          )
                        )
                      )
                    ),
                      (T = n);
                    for (var i = 0; i < t.length; i++) {
                      var r = t.item(i);
                      if ("style" === r.nodeName.toLowerCase()) {
                        document.head.insertBefore(n, r), (e = !0);
                        break;
                      }
                    }
                    e || document.head.appendChild(n),
                      I.fontFamily && A.setFontFamily(I.fontFamily);
                  }
                  z(I.embedded);
                })(),
                (0, s.setObjectReadOnly)(this);
              var K = window;
              K &&
                "function" == typeof K.define &&
                K.define.amd &&
                (K.WebSDK = y);
            }
            function C(e, t, n) {
              if (t) {
                var o = e.replace(
                  /(\.)([a-zA-Z_-]+)(?=[^}]+{)/gi,
                  "$1".concat(n, "-$2")
                );
                t.innerText = t.innerText + o;
              }
            }
            t.default = y;
            var x = "Text-to-speech is not available.";
            function _() {
              return (e = x), i.default.reject(Error(e));
              var e;
            }
            function S(e, t, n) {
              var o = Math.floor(window.innerWidth / 2),
                i = e.offsetLeft;
              i < 0
                ? (e.style.left = "10px")
                : i > window.innerWidth && (e.style.right = "10px"),
                i < o &&
                  (n.addCSSClass(e, "pos-left"),
                  (e.querySelector(".".concat(t, "-widget")).style.left =
                    "0px"));
            }
            (y.EVENT = r.ChatEvent),
              (y.SPEECH_LOCALE = d.RecognitionLocale),
              (y.THEME = p.IWidgetTheme),
              (y.Version = h.SDK_VERSION),
              (0, s.deepFreeze)(y);
          },
        },
        t = {};
      function n(o) {
        var i = t[o];
        if (void 0 !== i) return i.exports;
        var r = (t[o] = { exports: {} });
        return e[o].call(r.exports, r, r.exports, n), r.exports;
      }
      (n.d = function (e, t) {
        for (var o in t)
          n.o(t, o) &&
            !n.o(e, o) &&
            Object.defineProperty(e, o, { enumerable: !0, get: t[o] });
      }),
        (n.o = function (e, t) {
          return Object.prototype.hasOwnProperty.call(e, t);
        }),
        (n.r = function (e) {
          "undefined" != typeof Symbol &&
            Symbol.toStringTag &&
            Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
            Object.defineProperty(e, "__esModule", { value: !0 });
        });
      var o = n(9767);
      return (o = o.default);
    })();
  }),
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = factory())
    : "function" == typeof define && define.amd
    ? define("WebSDK", [], factory)
    : "object" == typeof exports
    ? (exports.WebSDK = factory())
    : (e.WebSDK = factory());
self.WebSDK = factory();
