import classNames from "classnames/bind";
import styles from "./LoginForm.module.scss";
import { useEffect, useState } from "react";
import localStorageKey from "config/localStorageKey";

const cx = classNames.bind(styles);

function LoginForm() {
  useEffect(() => {
    const profiles = localStorage.getItem(localStorageKey.profiles);
    if (profiles === null) {
      localStorage.setItem(localStorageKey.profiles, JSON.stringify([]));
    }

    const tasks = localStorage.getItem(localStorageKey.tasks);
    if (tasks === null) {
      localStorage.setItem(localStorageKey.tasks, JSON.stringify([]));
    }

    // Use a callback function to set the profiles state
    setProfiles(() => {
      const profiles = localStorage.getItem(localStorageKey.profiles);
      return JSON.parse(profiles);
    });

    console.log("useEffect");
  }, []);

  const [newProfile, setNewProfile] = useState("");
  const [profiles, setProfiles] = useState(() => {
    const profiles = localStorage.getItem(localStorageKey.profiles);
    return JSON.parse(profiles) ?? [];
  });

  const handleAddNewProfile = (e) => {
    e.preventDefault();

    if (newProfile === "") return;

    setProfiles((prev) => {
      const newProfiles = [...prev, newProfile];
      setNewProfile("");
      localStorage.setItem(
        localStorageKey.profiles,
        JSON.stringify(newProfiles)
      );
      return newProfiles;
    });

    const tasks = [
      ...JSON.parse(localStorage.getItem(localStorageKey.tasks)),
      [],
    ];
    localStorage.setItem(localStorageKey.tasks, JSON.stringify(tasks));
  };

  const handleProfileSelection = (index) => {
    localStorage.setItem(localStorageKey.profile, JSON.stringify(index));
    window.location.reload();
  };

  const handleProfileDeletion = (index) => {
    let newProfiles = [...profiles];
    newProfiles.splice(index, 1);
    setProfiles(newProfiles);
    localStorage.setItem(localStorageKey.profiles, JSON.stringify(newProfiles));

    let tasks = JSON.parse(localStorage.getItem(localStorageKey.tasks));
    tasks.splice(index, 1);
    localStorage.setItem(localStorageKey.tasks, JSON.stringify(tasks));
  };

  console.log("re-render");

  return (
    <div className={cx("container")}>
      <div className={cx("content")}>
        <div className={cx("profiles-section")}>
          <h3 className={cx("title")}>Select user profile</h3>
          <div className={cx("profiles-container")}>
            {profiles.length === 0 ? (
              <i className={cx("empty")}>Empty</i>
            ) : (
              profiles.map((profile, index) => {
                return (
                  <div className={cx("profile")} key={index}>
                    <button
                      className={cx("profile-btn")}
                      onClick={() => handleProfileSelection(index)}
                    >
                      {profile}
                    </button>
                    <button
                      className={cx("del-btn")}
                      onClick={() => handleProfileDeletion(index)}
                    >
                      <i className="fa-regular fa-trash-can"></i>
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className={cx("form-section")}>
          <form action="" onSubmit={(e) => handleAddNewProfile(e)}>
            <input
              type="text"
              placeholder="New profile"
              onChange={(e) => setNewProfile(e.target.value)}
              value={newProfile}
            />
            <button type="submit" className={cx("add-new-btn")}>
              Add new profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
