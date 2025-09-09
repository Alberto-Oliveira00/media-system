import { useEffect, useRef, useState } from "react";
import { Button, Row, Col, Space, Progress, Typography, Tooltip, Empty } from "antd";
import { PlayCircleOutlined, PauseOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import type { Playlist } from "../types/playlist";
import { usePlayerStore } from "../stores/usePlayerStore";

const { Title, Text } = Typography;

const getMediaUrl = (filePath?: string) =>
  `${import.meta.env.VITE_API_BASE_URL?.replace("/api", "") ?? ""}${filePath ?? ""}`;

type Props = { playlist: Playlist };

export default function PlayerView({ playlist }: Props) {
  const { currentIndex, playing, imageDuration, next, prev, play, pause, setIndex } = usePlayerStore();

  const media = playlist.medias[currentIndex];
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const imageTimerRef = useRef<number | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    return () => {
      if (imageTimerRef.current) window.clearTimeout(imageTimerRef.current);
    };
  }, []);

  useEffect(() => {
    setProgress(0);
    if (!media) return;

    if (imageTimerRef.current) {
      window.clearTimeout(imageTimerRef.current);
      imageTimerRef.current = null;
    }

    const isImage = media.filePath?.match(/\.(jpg|jpeg|png|gif|webp)$/i);
    if (isImage) {
      if (playing) {
        const start = performance.now();
        const tick = () => {
          const elapsed = (performance.now() - start) / 1000;
          setProgress(Math.min((elapsed / imageDuration) * 100, 100));
          if (elapsed >= imageDuration) {
            next();
          } else {
            imageTimerRef.current = window.setTimeout(tick, 200);
          }
        };
        imageTimerRef.current = window.setTimeout(tick, 0);
      }
    } else {
      if (videoRef.current) {
        if (playing) videoRef.current.play().catch(() => {});
        else videoRef.current.pause();
      }
    }
  }, [media, playing, imageDuration]);

  const onVideoTimeUpdate = () => {
    if (!videoRef.current) return;
    const v = videoRef.current;
    setProgress((v.currentTime / Math.max(v.duration, 1)) * 100);
  };

  const onVideoEnded = () => next();

  const togglePlay = () => {
    if (playing) pause();
    else play();
  };

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={16}>
          <div style={{ background: "#000", display: "flex", alignItems: "center", justifyContent: "center", minHeight: 320 }}>
            {media.filePath?.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
              <img src={getMediaUrl(media.filePath)} alt={media.nome} style={{ maxWidth: "100%", maxHeight: "70vh", objectFit: "contain" }} />
            ) : (
              <video
                ref={videoRef}
                src={getMediaUrl(media.filePath)}
                controls={false}
                onTimeUpdate={onVideoTimeUpdate}
                onEnded={onVideoEnded}
                style={{ width: "100%", maxHeight: "70vh", background: "#000" }}
                autoPlay={playing}
              />
            )}
          </div>

          <div style={{ marginTop: 12 }}>
            <Space align="center" style={{ width: "100%", justifyContent: "space-between" }}>
              <Space>
                <Tooltip title="Anterior">
                  <Button icon={<LeftOutlined />} onClick={prev} />
                </Tooltip>

                <Button type="primary" shape="circle" icon={playing ? <PauseOutlined /> : <PlayCircleOutlined />} onClick={togglePlay} />

                <Tooltip title="Próxima">
                  <Button icon={<RightOutlined />} onClick={next} />
                </Tooltip>
              </Space>

              <div style={{ flex: 1, margin: "0 12px" }}>
                <Progress percent={Math.round(progress)} showInfo={false} />
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <Text strong>{media.nome}</Text>
                  <Text type="secondary">{currentIndex + 1} / {playlist.medias?.length}</Text>
                </div>
              </div>
            </Space>
          </div>
        </Col>

        <Col xs={24} md={8}>
          <Title level={5}>Próximas</Title>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {playlist.medias.map((m, idx) => (
              <div key={m.id} style={{ display: "flex", gap: 8, alignItems: "center", padding: 8, background: idx === currentIndex ? "#f0f0f0" : "transparent", borderRadius: 6 }}>
                <img src={getMediaUrl(m.filePath)} alt={m.nome} style={{ width: 64, height: 48, objectFit: "cover", borderRadius: 4 }} />
                <div style={{ flex: 1 }}>
                  <Text strong>{m.nome}</Text>
                  <div style={{ fontSize: 12, color: "#565656ff" }}>{m.descricao}</div>
                </div>
                <Button onClick={() => setIndex(idx)}>Ir</Button>
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </div>
  );
}
