import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded'
import FastForwardRoundedIcon from '@mui/icons-material/FastForwardRounded'
import FastRewindRoundedIcon from '@mui/icons-material/FastRewindRounded'
import MovieRoundedIcon from '@mui/icons-material/MovieRounded'
import PlayCircleOutlineRoundedIcon from '@mui/icons-material/PlayCircleOutlineRounded'
import VolumeOffRoundedIcon from '@mui/icons-material/VolumeOffRounded'
import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded'
import {
  Alert,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Divider,
  FormControlLabel,
  Grid,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  Switch,
  Typography,
} from '@mui/material'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { HeroPanel, PageContainer, SectionPanel } from '../../components/pageScaffold'
import './videoDemo.scss'

type PresetVideo = {
  description: string
  duration: string
  id: string
  src: string
  tag: string
  title: string
}

type CurrentVideo = Omit<PresetVideo, 'id'>

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
    value: '切换片源、静音、自动播放、快退 5 秒、快进 5 秒',
  },
  {
    label: '适合扩展',
    value: '课程回放、产品介绍、活动宣传、监控录像预览',
  },
]

const capabilityList = [
  '直接使用浏览器原生 controls，接入成本低。',
  '本地上传采用对象 URL 预览，便于继续接入真实上传流程。',
  '切源时附带过渡遮罩，状态反馈更明确。',
]

const VideoDemo = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const objectUrlRef = useRef<string | null>(null)
  const pendingAutoplayAfterSwitchRef = useRef(false)
  const switchTimeoutRef = useRef<number | null>(null)
  const [selectedPresetId, setSelectedPresetId] = useState(presetVideos[0].id)
  const [localVideo, setLocalVideo] = useState<CurrentVideo | null>(null)
  const [autoplay, setAutoplay] = useState(true)
  const [muted, setMuted] = useState(true)
  const [isSwitchingSource, setIsSwitchingSource] = useState(false)

  const currentVideo = localVideo ?? presetVideos.find((item) => item.id === selectedPresetId) ?? presetVideos[0]

  useEffect(() => {
    return () => {
      if (switchTimeoutRef.current !== null) {
        window.clearTimeout(switchTimeoutRef.current)
      }

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
  }, [muted])

  useEffect(() => {
    const videoElement = videoRef.current

    if (!videoElement) {
      return
    }

    videoElement.load()
  }, [currentVideo.src])

  const startSourceSwitch = () => {
    if (switchTimeoutRef.current !== null) {
      window.clearTimeout(switchTimeoutRef.current)
      switchTimeoutRef.current = null
    }

    setIsSwitchingSource(true)
    videoRef.current?.pause()
  }

  useEffect(() => {
    const videoElement = videoRef.current

    if (!videoElement || !autoplay || isSwitchingSource) {
      return
    }

    void videoElement.play().catch(() => {})
  }, [autoplay, isSwitchingSource])

  const handlePresetChange = (presetId: string) => {
    if (presetId === selectedPresetId && localVideo === null) {
      return
    }

    pendingAutoplayAfterSwitchRef.current = autoplay
    startSourceSwitch()
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

    pendingAutoplayAfterSwitchRef.current = autoplay
    startSourceSwitch()

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

    videoElement.currentTime = Math.max(0, videoElement.currentTime - 5)
    void videoElement.play().catch(() => {})
  }

  const handleFastForward = () => {
    const videoElement = videoRef.current

    if (!videoElement) {
      return
    }

    const duration = Number.isFinite(videoElement.duration) ? videoElement.duration : Number.MAX_SAFE_INTEGER
    videoElement.currentTime = Math.min(duration, videoElement.currentTime + 5)
    void videoElement.play().catch(() => {})
  }

  const finishSourceSwitch = () => {
    const videoElement = videoRef.current

    if (switchTimeoutRef.current !== null) {
      window.clearTimeout(switchTimeoutRef.current)
    }

    switchTimeoutRef.current = window.setTimeout(() => {
      setIsSwitchingSource(false)
      switchTimeoutRef.current = null

      if (pendingAutoplayAfterSwitchRef.current && videoElement) {
        void videoElement.play().catch(() => {})
      }

      pendingAutoplayAfterSwitchRef.current = false
    }, 240)
  }

  const handleVideoLoaded = () => {
    finishSourceSwitch()
  }

  const handleVideoLoadStart = () => {
    if (!isSwitchingSource) {
      setIsSwitchingSource(true)
    }
  }

  const handleVideoError = () => {
    pendingAutoplayAfterSwitchRef.current = false
    finishSourceSwitch()
  }

  return (
    <Box component="main" className="video-demo-page" sx={{ minHeight: '100vh', py: { xs: 4, md: 6 } }}>
      <PageContainer>
        <HeroPanel
          className="video-demo-hero"
          kicker="Video Demo"
          title="新建一个可直接播放视频的演示页面"
          description="这个页面展示了 React 项目里最常见的视频播放场景：切换片源、本地视频预览，以及基于 HTML5 播放器继续扩展控制条和业务逻辑。"
          metrics={featureCards}
          side={(
            <div className="video-demo-highlight" aria-hidden="true">
              <div className="video-demo-highlight__screen">
                <span className="video-demo-highlight__badge">LIVE DEMO</span>
                <div className="video-demo-highlight__play" />
              </div>
            </div>
          )}
        />

        <SectionPanel
          className="video-demo-stage"
          kicker="Player"
          title="视频播放器"
          description="左侧用于预览和控制，右侧用于选择片源、查看交互说明和上传本地视频。"
        >
          <Grid container spacing={2.5} className="video-demo-layout">
            <Grid size={{ xs: 12, lg: 8 }}>
              <Card className="video-player-card" elevation={0}>
                <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
                  <Stack spacing={2.5}>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        alignItems: { xs: 'flex-start', md: 'center' },
                        justifyContent: 'space-between',
                        gap: 1.5,
                      }}
                    >
                      <Stack spacing={1}>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                          <Chip className="video-chip" label={currentVideo.tag} color="primary" />
                          <Chip className="video-duration" label={currentVideo.duration} variant="outlined" />
                        </Box>
                        <Box>
                          <Typography variant="h4">{currentVideo.title}</Typography>
                          <Typography color="text.secondary" sx={{ mt: 1, maxWidth: 720 }}>
                            {currentVideo.description}
                          </Typography>
                        </Box>
                      </Stack>

                      <Paper className="video-status-card" elevation={0}>
                        <Stack spacing={1}>
                          <Typography variant="overline" color="primary.dark">
                            当前状态
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {isSwitchingSource ? '片源切换中，播放器正在重新加载。' : '播放器已就绪，可继续预览或切换控制项。'}
                          </Typography>
                        </Stack>
                      </Paper>
                    </Box>

                    <div className={`video-frame${isSwitchingSource ? ' is-switching' : ''}`}>
                      <video
                        ref={videoRef}
                        autoPlay={autoplay}
                        className="video-frame__player"
                        controls
                        muted={muted}
                        onCanPlay={handleVideoLoaded}
                        onError={handleVideoError}
                        onLoadStart={handleVideoLoadStart}
                        onLoadedData={handleVideoLoaded}
                        playsInline
                        preload="metadata"
                      >
                        <source src={currentVideo.src} type="video/mp4" />
                        当前浏览器不支持 video 标签播放。
                      </video>

                      <div
                        aria-hidden={!isSwitchingSource}
                        className={`video-frame__overlay${isSwitchingSource ? ' is-visible' : ''}`}
                      >
                        <Chip className="video-frame__overlay-badge" label="切换片源中" />
                        <strong>{currentVideo.title}</strong>
                        <div className="video-frame__overlay-loader" />
                      </div>
                    </div>

                    {isSwitchingSource ? <LinearProgress color="primary" /> : null}

                    <Grid container spacing={1.5}>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <Paper className="video-control-card" elevation={0}>
                          <Stack spacing={1.25}>
                            <Typography variant="subtitle1">播放偏好</Typography>
                            <FormControlLabel
                              control={(
                                <Switch
                                  checked={autoplay}
                                  color="primary"
                                  onChange={() => setAutoplay((current) => !current)}
                                />
                              )}
                              label={autoplay ? '自动播放已开启' : '自动播放已关闭'}
                            />
                            <FormControlLabel
                              control={(
                                <Switch
                                  checked={muted}
                                  color="primary"
                                  onChange={() => setMuted((current) => !current)}
                                />
                              )}
                              label={muted ? '默认静音播放' : '默认带声音播放'}
                            />
                          </Stack>
                        </Paper>
                      </Grid>

                      <Grid size={{ xs: 12, md: 6 }}>
                        <Paper className="video-control-card" elevation={0}>
                          <Stack spacing={1.25}>
                            <Typography variant="subtitle1">快捷控制</Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.25 }}>
                              <Button
                                variant="outlined"
                                startIcon={<FastRewindRoundedIcon />}
                                onClick={handleReplay}
                              >
                                快退 5 秒
                              </Button>
                              <Button
                                variant="outlined"
                                startIcon={<FastForwardRoundedIcon />}
                                onClick={handleFastForward}
                              >
                                快进 5 秒
                              </Button>
                              <Button
                                variant={muted ? 'outlined' : 'contained'}
                                color={muted ? 'inherit' : 'primary'}
                                startIcon={muted ? <VolumeOffRoundedIcon /> : <VolumeUpRoundedIcon />}
                                onClick={() => setMuted((current) => !current)}
                              >
                                {muted ? '取消静音' : '切换静音'}
                              </Button>
                            </Box>
                          </Stack>
                        </Paper>
                      </Grid>
                    </Grid>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, lg: 4 }}>
              <Stack spacing={2.5} className="video-side-panel">
                <Card className="video-side-card" elevation={0}>
                  <CardContent sx={{ p: 0 }}>
                    <Stack spacing={2}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <MovieRoundedIcon color="primary" />
                      <Typography variant="h6">示例片源</Typography>
                      </Box>

                      <List disablePadding className="video-source-list">
                        {presetVideos.map((item) => {
                          const isActive = localVideo === null && item.id === selectedPresetId

                          return (
                            <ListItem disablePadding key={item.id}>
                              <Card className={`video-source-card${isActive ? ' is-active' : ''}`} elevation={0}>
                                <CardActionArea onClick={() => handlePresetChange(item.id)}>
                                  <CardContent sx={{ p: 2 }}>
                                    <Stack spacing={1.25}>
                                      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1 }}>
                                        <Typography variant="subtitle1">{item.title}</Typography>
                                        <Chip label={item.duration} size="small" variant="outlined" />
                                      </Box>
                                      <Typography variant="body2" color="text.secondary">
                                        {item.description}
                                      </Typography>
                                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                        <Chip label={item.tag} size="small" color={isActive ? 'primary' : 'default'} />
                                        {isActive ? <Chip label="当前播放" size="small" color="success" /> : null}
                                      </Box>
                                    </Stack>
                                  </CardContent>
                                </CardActionArea>
                              </Card>
                            </ListItem>
                          )
                        })}
                      </List>
                    </Stack>
                  </CardContent>
                </Card>

                <Card className="video-side-card" elevation={0}>
                  <CardContent>
                    <Stack spacing={2}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <PlayCircleOutlineRoundedIcon color="primary" />
                        <Typography variant="h6">使用建议</Typography>
                      </Box>
                      <Alert severity="info" variant="outlined">
                        这页更适合演示播放器接入、试看页或课程回放原型，不建议直接当成生产播放器。
                      </Alert>
                      <List disablePadding>
                        {capabilityList.map((item) => (
                          <ListItem key={item} disableGutters>
                            <ListItemText primary={item} />
                          </ListItem>
                        ))}
                      </List>
                    </Stack>
                  </CardContent>
                </Card>

                <Card className="video-side-card" elevation={0}>
                  <CardContent>
                    <Stack spacing={2}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CloudUploadRoundedIcon color="primary" />
                        <Typography variant="h6">本地视频预览</Typography>
                      </Box>
                      <Typography color="text.secondary" variant="body2">
                        选择本地 mp4 / webm / ogg 文件，适合做上传前预览，后续可继续接入 OSS、S3 或业务后台。
                      </Typography>
                      <Button component="label" variant="contained" startIcon={<CloudUploadRoundedIcon />}>
                        选择本地视频
                        <input
                          accept="video/mp4,video/webm,video/ogg"
                          className="video-upload-input"
                          id="video-upload-input"
                          onChange={handleUpload}
                          type="file"
                        />
                      </Button>
                      <Divider />
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        <Chip label={localVideo ? '已加载本地文件' : '当前使用内置片源'} color={localVideo ? 'success' : 'default'} />
                        <Chip label={autoplay ? '自动播放' : '手动播放'} variant="outlined" />
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Stack>
            </Grid>
          </Grid>
        </SectionPanel>
      </PageContainer>
    </Box>
  )
}

export default VideoDemo
