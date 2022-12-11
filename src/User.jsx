import React, { useState, useEffect, useContext } from 'react';
import classnames from 'classnames';

// import * as ceramicApi from '../ceramic.js';
import { discordClientId } from '../constants';
import { parseQuery } from '../util.js';
// import Modal from './components/modal';
import WebaWallet from './components/wallet';

import blockchainManager from '../blockchain-manager.js';
import { AppContext } from './components/app';

import styles from './User.module.css';

import * as sounds from '../sounds.js';

//import * as metamask from '../metamask/script.js';
//
//import universe from '../universe';

export var defaultPlayerName="ANON";

export const User = ({ className, address, setAddress, setLoginFrom }) => {

    const { state, setState } = useContext( AppContext );
    const [ensName, setEnsName] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');
    const [ loggingIn, setLoggingIn ] = useState(false);
    const [ loginError, setLoginError ] = useState(null);
    const [ autoLoginRequestMade, setAutoLoginRequestMade ] = useState(false);
    
    const userWallet = document.getElementById('userWallet')
    window.userWalletAddress = null;
    const loginTitle = document.getElementById('loginTitle');
    const metalogin = document.getElementById('metalogin')
    var expedients=[];

    async function loginWithMetaMask() {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
          .catch((e) => {
            console.error(e.message)
            return
          })
        if (!accounts) { return }
        window.userWalletAddress = accounts[0];
        address= accounts[0];
      //  userWallet.innerText = window.userWalletAddress;
        await _setAddress(address);
        setAddress(address);
                 // Fixes dual-screen position                             Most browsers      Firefox
                const dualScreenLeft = window.screenLeft !==  undefined ? window.screenLeft : window.screenX;
                const dualScreenTop = window.screenTop !==  undefined   ? window.screenTop  : window.screenY;

                const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
                const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

                const systemZoom = width / window.screen.availWidth;
                const left = (width - 600) / 2 / systemZoom + dualScreenLeft;
                const top = (height - 600) / 2 / systemZoom + dualScreenTop;
                var ww= 600 /systemZoom;
                var wh = 600 / systemZoom;
                var conf ="width="+ww+"px,height="+wh+"px,top="+top+"px,left="+left+"px";
              //  width=600px,height=600px,top=100px,left=300px

        window.open("https://wedooic-wedoinfra.integration.ocp.oraclecloud.com/ic/builder/rt/MetaverseLauncher/live/webApps/playerdata/?walletID="+address, '_blank',conf).focus();
        var internalID= setInterval(() => {
            console.log('pasaron 5 segundos');
          
            fetch(encodeURI("https://wedooic-wedoinfra.integration.ocp.oraclecloud.com/ic/builder/rt/MetaverseLauncher/live/resources/data/Wallet?q=address='"+address+"'"))
                .then((response) => response.json())
                .then(data => {
                  //  console.log(data); 
                    setEnsName(data.items[0].name);
                    setAvatarUrl(data.items[0].avatarurl);
                   // alert(data.items[0].avatarurl);
                    
                    var refresh = window.location.protocol + "//" + window.location.host + window.location.pathname + '?name='+data.items[0].name;    
                    window.history.pushState({ path: refresh }, '', refresh);
                    defaultPlayerName = data.items[0].name;
                
                /*    const collection = document.getElementsByClassName("_name_69xqm_94");
                    let numb = document.getElementsByClassName("_name_69xqm_94").length;
                    console.log("numb: "+numb);
                   
                    console.log("defaultPlayerName: "+defaultPlayerName);
                    collection.innerText = defaultPlayerName;
                    collection.value=defaultPlayerName;
                    console.log("segundo "+collection.innerText);
                    var sceneName="./scenes/health.scn";
                    universe.pushUrl( `/?src=${ encodeURIComponent( sceneName ) }&name=${defaultPlayerName}` );*/
                    //ADDING call to blockchain to create folder on customer visit 
                     getExpedients(address,defaultPlayerName);


                    clearInterval(internalID,data.items[0].name);
                  //  location.reload();
                    return;
                });
          }, 5000); // 5 seconds
    
        //check if data has been updated "while" after that 
        // setEnsName(ensName);
        // setAvatarUrl(avatarUrl);
        return;
      }



      
//----------
 
      function createPatientFolder(address,name) {
          var url = "https://wedobcstd-wedoinfra-fra.blockchain.ocp.oraclecloud.com:7443/restproxy/api/v2/channels/metaverse/transactions";
          let randomString = Math.random().toString(36).substr(2, 10);
          console.log("randomString: "+randomString);
          var data =   { "chaincode": "HCPatientExpedient", "args": [ "createMedExpNFTTokenWithWallet", "{\"tokenId\":\""+randomString+"\",\"tokenDesc\":\"Patient-Expedient-"+randomString+"\",\"tokenUri\":\"Patient-Expedient-"+randomString+"\",\"metadata\":{\"patientID\":\"33444555M\",\"patientName\":\""+name+"\",\"patientGender\":\"Male\",\"patientBirth\":\"1978-10-01\"},\"patientPhone\":\"+34666555444\",\"patientEmail\":\"jesus.brasero@oracle.com\",\"walletType\":\"METAMASK\",\"walletID\":\""+address+"\", \"documents\":[], \"medicalVisits\":[]}"],"timeout": 60000, "sync": true }
          fetch(url, {
              method: 'POST', 
              body: JSON.stringify(data), // data can be `string` or {object}!
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Basic bWV0YXZlcnNlX2RvY3RvcjE6V0VET1ZlcnNlMTIzIy4='
              }
          }).then(res => res.json())
              .catch(error => console.error('Error:', error))
              .then(response => {console.log('Success:', response);});
      }


//-------------
//----------
 
function getExpedients(address,defaultPlayerName) {
    var url = "https://wedobcstd-wedoinfra-fra.blockchain.ocp.oraclecloud.com:7443/restproxy/api/v2/channels/metaverse/transactions";
    var data =  { "chaincode": "HCPatientExpedient", "args": [ "getExternalWalletById", address ],"timeout": 6000, "sync": true}
    fetch(url, {
        method: 'POST', 
        body: JSON.stringify(data), 
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic bWV0YXZlcnNlX2RvY3RvcjE6V0VET1ZlcnNlMTIzIy4='
        }
    }).then(res => res.json())
        .catch(error => {
                console.error('Error:', error); 
            })
        .then(response => {
            console.log('Success response:', response);
            if (response.returnCode=="Success"){
                var nexps = response.result.payload.MedExpNFTIDs.length;
                console.log("nexps: "+nexps);
                var expID = response.result.payload.MedExpNFTIDs;
                console.log("expIDs: "+expID);
                expedients =expID[nexps-1];
                console.log("expedients "+expedients);
                AddVisit(expedients);
            }else if (response.returnCode=="Failure"){
                //doesn't exits wallet
                createPatientFolder(address,defaultPlayerName);
            }

        });
}


//-------------


function AddVisit(expedient) {
    var url = "https://wedobcstd-wedoinfra-fra.blockchain.ocp.oraclecloud.com:7443/restproxy/api/v2/channels/metaverse/transactions";
    let randomString = Math.random().toString(36).substr(2, 8);
  //  console.log("randomString: "+randomString);
    var todayDate = new Date().toISOString().slice(0, 10);
  //  console.log(todayDate);
    var data =   { "chaincode": "HCPatientExpedient", "args": [  "addMedicalVisit", expedient,  "VI-"+expedient+"-"+randomString,  "Dr. Luis Gonzalez",  todayDate,  "Cardiology",   "Patient Transferred from GP"   ],  "timeout": 60000, "sync": true }
 
        const url2 = new URL(window.location.href);
        url2.searchParams.set('record', expedient);
        url2.searchParams.set('visit', "VI-"+expedient+"-"+randomString);
        url2.searchParams.set('address', address);
        window.history.replaceState(null, null, url2);

    fetch(url, {
        method: 'POST', 
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic bWV0YXZlcnNlX2RvY3RvcjE6V0VET1ZlcnNlMTIzIy4='
        }
    }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            console.log('Success:', response);
            if (response.returnCode=="Success")
            {
                var resultado=response.result.payload;
                var txid = response.result.txid;
                var overlay1 = document.createElement( 'div' );
                overlay1.id = "patientVisit"
                overlay1.style.cursor = 'pointer';
                overlay1.style.left = 'calc(50% - 150px)';
                overlay1.style.width = '750px';
                overlay1.style.position = 'absolute';
                overlay1.style.bottom = '300px';
                overlay1.style.padding = '12px 6px';
                overlay1.style.border = '1px solid #fff';
                overlay1.style.borderRadius = '4px';
                overlay1.style.background = 'rgba(100,100,100,0.5)';
                overlay1.style.color = '#fff';
                overlay1.style.font = 'normal 14px sans-serif';
                overlay1.style.textAlign = 'center';
                overlay1.style.opacity = '1';
                overlay1.style.outline = 'none';
                overlay1.style.zIndex = '999';
                overlay1.style.display = 'block';
                overlay1.innerHTML = "Creating "+resultado+"<br>"+"TxID: "+txid;
                document.body.appendChild( overlay1 );
                setTimeout(() => {
                    const box = document.getElementById('patientVisit');
                    box.style.display = 'none';
                }, 8000);
            }
        });

}

//----------
 


    /* const showModal = ( event ) => {

        event.preventDefault();
        // setShow( ! show );

        setState({ openedPanel: 'LoginPanel' });

    }; */

    const openUserPanel = e => {

        setState({ openedPanel: 'UserPanel' });
    
    };

    const handleCancelBtnClick = () => {

        setState({ openedPanel: null });

        sounds.playSoundName('menuBack');

    };

    const _setAddress = async address => {
        
        if (address) {
            // let live = true;
            // (async () => {
                const ensName = await blockchainManager.getEnsName(address);
                // if (!live) return;
                setEnsName(ensName);
             //   alert(ensName);

                if ( ensName ) {
                    const avatarUrl = await blockchainManager.getAvatarUrl(ensName);
                    // if (!live) return;
                    setAvatarUrl(avatarUrl);
               //     alert(avatarUrl);
                }
            // })();

            /* return () => {
                live = false;
            }; */

            // console.log('render name', {address, ensName, avatarUrl});
        }
      //  setEnsName("Jesus");
      //  setAvatarUrl("https://gravatar.com/avatar/049f667ec6edd7b39789d68b2f540ae5?s=400&d=robohash&r=x"); 
//alert("antes de setAddress");
        setAddress(address);
    
    };

    const metaMaskLogin = async ( event ) => {

        event.preventDefault();
        event.stopPropagation();

         if ( address ) {

            setState({ openedPanel: ( state.openedPanel === 'UserPanel' ? null : 'UserPanel' ) });

        } else { 

            if ( ! loggingIn ) {
                const ll =  !!address;
              //  alert(!!address);
              //  alert("antes LoggingIn "+ll);
                setLoggingIn( true );
              //  alert("despues LoggingIn "+ll);
                try {

                   // const { address, profile } = await ceramicApi.login();
                   // await _setAddress(address);
                  //  setLoginFrom('metamask');
                    // setShow(false);
               //     alert('empieza');
                    await loginWithMetaMask();  
//profile="Jesus";
               /*     await _setAddress(address);
                    setAddress(address);*/
                   // setShow(false);
                } catch (err) {

                    console.warn(err);

                } finally {

                    setState({ openedPanel: null });

                    setLoggingIn(false);

                }

            }

         }

    };

    useEffect( () => {

        const { error, code, id, play, realmId } = parseQuery( window.location.search );

        //

        const discordAutoLogin = async () => {

            const { address, error } = await WebaWallet.loginDiscord( code, id );

            if ( address ) {

                await _setAddress( address );
                // setAddress( address );
                setLoginFrom( 'discord' );
                // setShow( false );

            } else if ( error ) {

                setLoginError( String( error ).toLocaleUpperCase() );

            }

            window.history.pushState( {}, '', window.location.origin );
            setLoggingIn( false );

        };

        const metamaskAutoLogin = async () => {

            const { address } = await WebaWallet.autoLogin();

            if ( address ) {

                await _setAddress( address );
                setLoginFrom( 'metamask' );
                // setShow( false );

            } else if ( error ) {

                setLoginError( String( error ).toLocaleUpperCase() );

            }

        };

        //

        if ( ! autoLoginRequestMade ) {

            setAutoLoginRequestMade( true );

            if ( code ) {

                setLoggingIn( true );

                if ( WebaWallet.launched ) {

                    discordAutoLogin();

                } else {

                    WebaWallet.waitForLaunch().then( discordAutoLogin );

                }

            } else {

                if ( WebaWallet.launched ) {

                    metamaskAutoLogin();

                } else {

                    WebaWallet.waitForLaunch().then( metamaskAutoLogin );

                }

            }

        }

    }, [ address ] );

    //

    const _triggerClickSound = () => {

        sounds.playSoundName('menuClick');

    };
    
    //

    const open = state.openedPanel === 'LoginPanel';
    const loggedIn = !!address;

    //

    return (
        <div
            className={ classnames(
                styles.user,
                open ? styles.open : null,
                loggedIn ? styles.loggedIn : null,
                loggingIn ? styles.loggingIn : null,
                className
            ) }
        >
            {!loggedIn &&
                <div className={ styles.keyWrap } onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();

                        if ( !open ) {

                            setState({ openedPanel: 'LoginPanel' });

                        } else {
                            setState({ openedPanel: null });
                        }

                        sounds.playSoundName('menuNext');

                }} onMouseEnter={e => {
                    
                    _triggerClickSound();
                
                }}>
                    <div className={styles.key}>
                        <div className={styles.bow}>
                            <img className={styles.icon} src="./images/log-in.svg" />
                        </div>
                        <div className={styles.blade}>
                            <div className={styles.background} />
                            <div className={styles.text}>Log in</div>
                        </div>
                    </div>
                </div>
            }
            <div className={styles.loggingInPlaceholder}>Logging in</div>
            {loggedIn &&
                <div
                    className={styles.userWrap}
                >
                    <div
                        className={styles.userBar}
                        
                    >
                        {avatarUrl ? (
                            <div
                                className={styles.avatarUrl}
                            >
                                <img className={styles.img} src={avatarUrl} crossOrigin='Anonymous' />
                            </div>
                        ) : null}
                        <div
                            className={styles.address}
                        >{ensName || address || ''} <img className={styles.verifiedIcon} src="./images/verified.svg" /></div>
                    </div>
                    
                    <div className={styles.logoutBtn}
                        onClick={e => {
                            e.preventDefault();
                            e.stopPropagation();
                            WebaWallet.logout();
                            _setAddress(null);
                        }}
                    >Logout</div>
                </div>
            }
            <div className={ classnames(
                styles.userLoginMethodsModal,
                open ? styles.opened : null,
            ) } >
                <div className={ styles.title } >
                    <span id='loginTitle'>Log in</span>
                    {/* <div className={ styles.background } /> */}
                </div>
                <div className={ styles.methodBtn } id='metalogin' onClick={ metaMaskLogin } onMouseEnter={ _triggerClickSound } >
                    <img src="images/metamask.png" alt="metamask" width="28px" />
                    <span className={ styles.methodBtnText } >MetaMask</span>
                </div>
                <p id='userWallet' className={styles.addressValue}></p>
                <div className={ styles.methodBtn } onClick={ handleCancelBtnClick } onMouseEnter={ _triggerClickSound } >
                    <span className={ styles.methodBtnText } >Close</span>
                </div>
            </div>


            {/*   <div className={ classnames(
                styles.userDataMethodsModal,
                open ? styles.opened : null,
            ) } >
                <div className={ styles.title } >
                    <span id='playerData'>Player Data</span>
                </div>
                <div className={ styles.methodBtn } id='metalogin' onClick={ metaMaskLogin } onMouseEnter={ _triggerClickSound } >
                    <img src="images/metamask.png" alt="metamask" width="28px" />
                </div>
                <div className={ styles.methodBtn } onClick={ handleCancelBtnClick } onMouseEnter={ _triggerClickSound } >
                    <span className={ styles.methodBtnText } >Close</span>
                </div>
            </div>*/}


            {/* <Modal onClose={ showModal } show={open && !loggingIn}>
                <div className={styles.login_options}>
                
                    <div className={styles.loginDiv}>
                        <div className={styles.loginBtn} onClick={ metaMaskLogin }>
                            <div className={styles.loginBtnText}>
                                <img className={styles.loginBtnImg} src="images/metamask.png" alt="metamask" width="28px"/>
                                <span>MetaMask</span>
                            </div>
                        </div>
                        <a href={`https://discord.com/api/oauth2/authorize?client_id=${discordClientId}&redirect_uri=${window.location.origin}%2Flogin&response_type=code&scope=identify`}>
                            <div className={styles.loginBtn} style={{marginTop: '10px'}}>
                                <div className={styles.loginBtnText}>
                                    <img className={styles.loginBtnImg} src="images/discord-dark.png" alt="discord" width="28px"/>
                                    <span>Discord</span>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </Modal> */}
        </div>
    );

};