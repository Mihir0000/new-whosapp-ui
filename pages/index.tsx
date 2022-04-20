import { Fragment, useEffect, useRef, useState } from 'react';
import Header from '../components/layout/Header';
import styles from './index.module.css';
import ContactSide from '../components/layout/Contacts';
import ChatSide from '../components/layout/Chat';
import Dummy_Data from '../components/data/dummy_data';
import { Dummy_Data_Search } from '../components/data/dummy_data';
// import { userActionCreator } from '../components/redux/action-creators/userActionCreators';
// import { useDispatch } from 'react-redux';
import CancelIcon from '@mui/icons-material/Cancel';
import SearchIcon from '@mui/icons-material/Search';
// import { TrendingUpTwoTone } from '@mui/icons-material';
import PivotTableChartIcon from '@mui/icons-material/PivotTableChart';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

var createHost = require('cross-domain-storage/host');

var createGuest = require('cross-domain-storage/guest');

function HomePage() {
    let search = '';
    const [channel, setChannel] = useState('Channel_1');
    const [searchWord, setSearchWord] = useState('');
    const [contacts, setContacts] = useState(Dummy_Data);
    const my_ref = useRef<any>(null);
    const [focus, setFocus] = useState(false);
    const [flag, setFlag] = useState(true);
    const [display, setDisplay] = useState('grid');
    const [wid, setWid] = useState('auto');
    const [open, setOpen] = useState(false);
    useEffect(() => {
        //console.log('search { ',searchWord,'}')
        //console.log("search-send",Dummy_Data_Search(searchWord))
        setContacts(Dummy_Data_Search(searchWord));
    }, [searchWord]);

    /* useEffect(()=>{
        //console.log('focus',focus)
    },[focus]) */

    useEffect(() => {
        var storageHost = createHost([
            {
                origin: 'https://chat-ui-backend.vercel.app/',
                allowedMethods: ['get', 'set', 'remove'],
            },
            {
                origin: 'https://whosapp-auth.vercel.app/chat',
                allowedMethods: ['get', 'set', 'remove'],
            },
        ]);

        var bazStorage = createGuest('https://whosapp-auth.vercel.app/chat');
        bazStorage.get('Backendless', function (error: any, value: any) {
            // value for the key of 'fizz' will be retrieved from localStorage on www.baz.com
            // console.log(value);
        });
    }, []);

    // const toggleBtn = () => {
    //     if (flag) {
    //         document
    //             .getElementById(styles.chat)
    //             ?.classList.remove(styles.chat_toggler);
    //         document
    //             .getElementById(styles.contact_container)
    //             ?.classList.add(styles.nav_toggle);
    //         setFlag(!flag);
    //     } else {
    //         document
    //             .getElementById(styles.contact_container)
    //             ?.classList.remove(styles.nav_toggle);
    //         document
    //             .getElementById(styles.chat)
    //             ?.classList.add(styles.chat_toggler);
    //         setFlag(!flag);
    //     }
    //     console.log('clicked');
    // };
    const onclick = () => {
        if (flag) {
            setDisplay('none');
            setWid('95vw');
            setFlag(!flag);
            setOpen(!open);
        } else {
            setDisplay('grid');
            setWid('auto');
            setFlag(!flag);
            setOpen(!open);
        }
    };
    return (
        <Fragment>
            <div className={styles.background}>
                <Header />
                <div className={styles.navContainer} >
                    <a className={styles.navBtn} onClick={onclick} >
                        {open ? <MenuIcon /> : <CloseIcon style={{backgroundColor : 'red'}} />}
                    </a>
                </div>
                <div className={styles.container}>
                    <div
                        id={styles.contact_container}
                        style={{ display: display }}
                    >
                        <div className={styles.contact_heading}>Contacts</div>

                        <div className={styles.search}>
                            <form
                                className={styles.row}
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    console.log('submit');
                                }}
                            >
                                <input
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        console.log('submit');
                                    }}
                                    ref={my_ref}
                                    className={styles.input}
                                    type="text"
                                    autoComplete="off"
                                    id={'searchWord'}
                                    value={searchWord}
                                    placeholder="Search Your Channel..."
                                    onChange={(e) => {
                                        setSearchWord(e.target.value);
                                        if (e.target.value != '') {
                                            setFocus(true);
                                        }
                                    }}
                                    onFocus={() => setFocus(true)}
                                    onBlur={() => {
                                        setTimeout(() => {
                                            setFocus(false);
                                        }, 500);
                                    }}
                                />
                                <button
                                    title={'search'}
                                    type="submit"
                                    className={styles.search_btn}
                                    onClick={(e) => {
                                        console.log('pressed');
                                        e.preventDefault();
                                        if (focus === true) {
                                            //console.log("clicked")
                                            setSearchWord('');
                                            // my_ref.current.value('')
                                            //console.log('searchWord{',searchWord,'}')
                                            my_ref.current.blur();

                                            setFocus(false);
                                        } else {
                                            my_ref.current.focus();
                                            setFocus(true);
                                        }
                                    }}
                                >
                                    {focus === false ? (
                                        <SearchIcon color="inherit" />
                                    ) : (
                                        <CancelIcon color="inherit" />
                                    )}
                                </button>
                            </form>
                        </div>

                        <div id={styles.all_contacts}>
                            {focus ? (
                                <div>Press enter to cancel search</div>
                            ) : (
                                <></>
                            )}
                            {contacts.length > 0 ? (
                                contacts.map((item) => (
                                    <ContactSide
                                        key={item.id}
                                        id={item.id}
                                        name={item.name}
                                        setChannel={setChannel}
                                        channel={channel}
                                    />
                                ))
                            ) : (
                                <div className={styles.no_contacts}>
                                    No Such Contact starts with {searchWord}
                                </div>
                            )}
                        </div>
                    </div>
                    <div id={styles.chat} style={{ width: wid }}>
                        <ChatSide channel={channel} />
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default HomePage;
