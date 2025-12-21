import { useEffect, useState } from "react";
import { config } from "../../../config/config";
import { mapMessagesFromApi } from "../data/chatData";
import useUserProfile from "../../Profile/hook/useUserProfile";

const getToken = () => localStorage.getItem("token") || "";

export const useUserChat = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const { user, photo } = useUserProfile();

  const fetchMyMessages = async () => {
    const token = getToken();

    const meRes = await fetch(`${config.api}user/me`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!meRes.ok) throw new Error("Gagal ambil user");

    const me = await meRes.json();
    const id = me.id ?? me.data?.id;
    if (!id) throw new Error("ID user tidak ditemukan di response /user/me");

    setUserId(id);

    const chatRes = await fetch(`${config.api}message/user/${id}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!chatRes.ok) throw new Error("Gagal ambil pesan user");

    const data = await chatRes.json();
    return data;
  };

  const refreshMessages = async () => {
    try {
      setLoading(true);
      const raw = await fetchMyMessages();
      setMessages(mapMessagesFromApi(raw, { user, photo }));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true);
        const raw = await fetchMyMessages();
        setMessages(mapMessagesFromApi(raw, { user, photo }));
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [user, photo]);

  const sendUserMessage = async (text) => {
    const token = getToken();

    let id = userId;
    if (!id) {
      const meRes = await fetch(`${config.api}user/me`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!meRes.ok) throw new Error("Gagal ambil user saat kirim pesan");
      const me = await meRes.json();
      id = me.id ?? me.data?.id;
      setUserId(id);
    }

    await fetch(`${config.api}message/send`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        userId: id,
        userMessage: text,
        adminMessage: "",
      }),
    });

    const chatRes = await fetch(`${config.api}message/user/${id}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    refreshMessages();

    if (!chatRes.ok) return;
    const data = await chatRes.json();
    setMessages(mapMessagesFromApi(data, { user, photo }));
  };

  return {
    messages,
    loading,
    sendUserMessage,
    refreshMessages,
  };
};
