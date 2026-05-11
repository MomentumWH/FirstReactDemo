import { ChangeEvent, useEffect, useRef, useState } from 'react'
import '../pages.css'
import './videoDemo.css'

type PresetVideo = {
  id: string
  title: string
  src: string
  tag: string
  duration: string
  description: string
}

type CurrentVideo = {
  title: string
  src: string
  tag: string
  duration: string
  description: string
}

const presetVideos: PresetVideo[] = [
  {
    id: 'flower',
    title: 'Flower Motion',
    src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    tag: '内置演示',
    duration: '00:30',
    description: '使用 HTML5 video 直接播放网络视频源，适合做最基础的播放器接入示例。',
  },
  {
    id: 'big-buck-bunny',
    title: 'Big Buck Bunny',
    src: 'https://www.w3schools.com/html/mov_bbb.mp4',
    tag: '公共样片',
    duration: '00:10',
    description: '切换播放源后会自动重新加载播放器，方便你继续扩展成播放列表或课程视频页。',
  },
]

const featureCards = [
  {
    label: '播放方式',
    value: '内置视频 + 本地上传',
  },
  {
    label: '核心能力',
    value: '切换片源、静音、自动播放、快退 10 秒',
  },
  {
    label: '适合扩展',
    value: '课程回放、产品介绍、活动宣传、监控录屏预览',
  },
]

const VideoDemo = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const objectUrlRef = useRef<string | null>(null)
  const [selectedPresetId, setSelectedPresetId] = useState(presetVideos[0].id)
  const [localVideo, setLocalVideo] = useState<CurrentVideo | null>(null)
  const [autoplay, setAutoplay] = useState(true)
  const [muted, setMuted] = useState(true)

  const currentVideo = localVideo ?? presetVideos.find((item) => item.id === selectedPresetId) ?? presetVideos[0]

  useEffect(() => {
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const videoElement = videoRef.current

    if (!videoElement) {
      return
    }

    videoElement.muted = muted
    videoElement.load()

    if (autoplay) {
      void videoElement.play().catch(() => {})
    }
  }, [autoplay, currentVideo.src, muted])

  const handlePresetChange = (presetId: string) => {
    setSelectedPresetId(presetId)

    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current)
      objectUrlRef.current = null
    }

    setLocalVideo(null)
  }

  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]

    if (!selectedFile) {
      return
    }

    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current)
    }

    const nextObjectUrl = URL.createObjectURL(selectedFile)
    objectUrlRef.current = nextObjectUrl

    setLocalVideo({
      title: selectedFile.name,
      src: nextObjectUrl,
      tag: '本地文件',
      duration: '等待读取',
      description: '当前正在预览你刚选择的本地视频文件，这一段逻辑适合继续接入上传接口。',
    })

    event.target.value = ''
  }

  const handleReplay = () => {
    const videoElement = videoRef.current

    if (!videoElement) {
      return
    }

    videoElement.currentTime = Math.max(0, videoElement.currentTime - 10)
    void videoElement.play().catch(() => {})
  }

  return (
    <main className="page-shell video-demo-page">
      <section className="page-hero video-demo-hero" aria-labelledby="video-demo-title">
        <div className="page-hero__content">
          <span className="page-kicker">Video Demo</span>
          <h1 id="video-demo-title">新建一个可直接播放视频的演示页面</h1>
          <p>
            这个页面演示了 React 项目里最常见的视频播放场景：切换片源、本地视频预览，以及基于
            HTML5 播放器继续扩展控制条和业务逻辑。
          </p>

          <div className="video-demo-metrics" aria-label="视频能力摘要">
            {featureCards.map((item) => (
              <article className="video-demo-metric-card" key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </article>
            ))}
          </div>
        </div>

        <div className="page-hero__visual video-demo-highlight" aria-hidden="true">
          <div className="video-demo-highlight__screen">
            <span className="video-demo-highlight__badge">LIVE DEMO</span>
            <div className="video-demo-highlight__play" />
          </div>
        </div>
      </section>

      <section className="page-section video-demo-stage" aria-labelledby="player-title">
        <div className="section-header">
          <div>
            <span className="section-kicker">Player</span>
            <h2 id="player-title">视频播放器</h2>
          </div>
        </div>

        <div className="video-demo-layout">
          <article className="video-player-card">
            <div className="video-player-card__header">
              <div>
                <span className="video-chip">{currentVideo.tag}</span>
                <h3>{currentVideo.title}</h3>
              </div>
              <span className="video-duration">{currentVideo.duration}</span>
            </div>

            <div className="video-frame">
              <video
                ref={videoRef}
                autoPlay={autoplay}
                className="video-frame__player"
                controls
                muted={muted}
                playsInline
                preload="metadata"
              >
                <source src={currentVideo.src} type="video/mp4" />
                当前浏览器不支持 video 标签播放。
              </video>
            </div>

            <p className="video-player-card__description">{currentVideo.description}</p>

            <div className="video-toolbar">
              <button onClick={() => setAutoplay((current) => !current)} type="button">
                {autoplay ? '关闭自动播放' : '开启自动播放'}
              </button>
              <button onClick={() => setMuted((current) => !current)} type="button">
                {muted ? '取消静音' : '切换静音'}
              </button>
              <button onClick={handleReplay} type="button">
                快退 10 秒
              </button>
            </div>
          </article>

          <aside className="video-side-panel">
            <div className="video-side-panel__section">
              <div className="video-side-panel__title">示例片源</div>
              <div className="video-source-list">
                {presetVideos.map((item) => (
                  <button
                    className={`video-source-card${localVideo === null && item.id === selectedPresetId ? ' is-active' : ''}`}
                    key={item.id}
                    onClick={() => handlePresetChange(item.id)}
                    type="button"
                  >
                    <strong>{item.title}</strong>
                    <span>{item.description}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="video-side-panel__section">
              <div className="video-side-panel__title">本地视频预览</div>
              <label className="video-upload-card" htmlFor="video-upload-input">
                <span>选择本地 mp4 / webm / ogg 文件</span>
                <small>适合做上传前预览，后续可接入 OSS、S3 或业务后台。</small>
              </label>
              <input
                accept="video/mp4,video/webm,video/ogg"
                className="video-upload-input"
                id="video-upload-input"
                onChange={handleUpload}
                type="file"
              />
            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}

export default VideoDemo
