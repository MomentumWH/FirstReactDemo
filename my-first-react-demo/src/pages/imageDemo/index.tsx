import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded'
import PhotoLibraryRoundedIcon from '@mui/icons-material/PhotoLibraryRounded'
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded'
import TuneRoundedIcon from '@mui/icons-material/TuneRounded'
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogContent,
  Divider,
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material'
import {
  type ChangeEvent,
  type MouseEvent as ReactMouseEvent,
  memo,
  type WheelEvent as ReactWheelEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { HeroPanel, PageContainer, SectionPanel } from '../../components/pageScaffold'
import './imageDemo.scss'

const IMAGE_VIEWER_MIN_SCALE = 1
const IMAGE_VIEWER_MAX_SCALE = 4
const IMAGE_VIEWER_SCALE_STEP = 0.2
const LOCAL_IMAGE_DESCRIPTION = '已导入本地图片，可点击放大预览或通过删除按钮移除。'

type GalleryImage = {
  description: string
  dimensions: string
  id: string
  sourceType: 'preset' | 'upload'
  src: string
  tag: string
  title: string
}

const presetImages: GalleryImage[] = [
  {
    id: 'coastline',
    title: 'Coastline Mood',
    src: 'https://picsum.photos/id/1015/1200/800',
    tag: '内置演示',
    dimensions: '1200 × 800',
    description: '适合演示封面图库、素材列表以及图片点击放大查看的典型交互。',
    sourceType: 'preset',
  },
  {
    id: 'portrait-cat',
    title: 'Portrait Sample',
    src: 'https://picsum.photos/id/1025/900/1200',
    tag: '公共样片',
    dimensions: '900 × 1200',
    description: '竖版样片适合测试多列列表、素材卡片裁切，以及弹窗放大浏览效果。',
    sourceType: 'preset',
  },
]

const featureCards = [
  {
    label: '核心场景',
    value: 'ImageList 图片列表 + 批量本地导入',
  },
  {
    label: '展示能力',
    value: '多图网格预览、点击放大、导入图片删除',
  },
  {
    label: '适合扩展',
    value: '商品图库、海报管理、素材池、相册墙',
  },
]

const capabilityList = [
  '上传控件已切换为 multiple，可一次导入多张图片。',
  '导入的图片会优先显示在列表前部，便于做素材确认或二次操作。',
  '放大预览沿用现有弹窗，可滚轮缩放并在大于 100% 时拖拽查看细节。',
]

type ImageUploadCardProps = {
  hasLocalImages: boolean
  isImporting: boolean
  onReset: () => void
  onUpload: (event: ChangeEvent<HTMLInputElement>) => void
  totalUploads: number
}

type ImageGalleryListProps = {
  columns: number
  images: GalleryImage[]
  isImporting: boolean
  onDelete: (imageId: string) => void
  onOpenViewer: (imageId: string) => void
}

const imageHeroSide = (
  <div className="image-demo-highlight" aria-hidden="true">
    <div className="image-demo-highlight__frame">
      <span className="image-demo-highlight__badge">IMAGE LIST</span>
      <div className="image-demo-highlight__mountain" />
    </div>
  </div>
)

const ImageGalleryList = memo(({ columns, images, isImporting, onDelete, onOpenViewer }: ImageGalleryListProps) => {
  return (
    <Box className="image-gallery-panel">
      {isImporting ? <LinearProgress color="primary" sx={{ mb: 2 }} /> : null}

      <ImageList className="image-gallery-list" cols={columns} gap={18} variant="masonry">
        {images.map((item) => {
          const subtitle = `${item.tag} · ${item.dimensions}`

          return (
            <ImageListItem className="image-gallery-item" key={item.id}>
              <button
                aria-label={`放大预览图片：${item.title}`}
                className="image-gallery-item__button"
                onClick={() => onOpenViewer(item.id)}
                type="button"
              >
                <img alt={item.title} className="image-gallery-item__image" loading="lazy" src={item.src} />
                <span className="image-gallery-item__hint">点击放大预览</span>
              </button>

              {item.sourceType === 'upload' ? (
                <IconButton
                  aria-label={`删除图片 ${item.title}`}
                  className="image-gallery-item__delete"
                  onClick={() => onDelete(item.id)}
                  size="small"
                >
                  <DeleteOutlineRoundedIcon fontSize="small" />
                </IconButton>
              ) : null}

              <ImageListItemBar className="image-gallery-item__bar" subtitle={subtitle} title={item.title} />
            </ImageListItem>
          )
        })}
      </ImageList>
    </Box>
  )
})

const ImageTipsCard = memo(() => {
  return (
    <Card className="image-side-card" elevation={0}>
      <CardContent>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TuneRoundedIcon color="primary" />
            <Typography variant="h6">使用建议</Typography>
          </Box>
          <Alert severity="info" variant="outlined">
            现在这页更偏向素材图库或图片墙原型，适合继续接入真实上传、排序和分组逻辑。
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
  )
})

const ImageUploadCard = memo(({ hasLocalImages, isImporting, onReset, onUpload, totalUploads }: ImageUploadCardProps) => {
  return (
    <Card className="image-side-card" elevation={0}>
      <CardContent>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CloudUploadRoundedIcon color="primary" />
            <Typography variant="h6">批量导入图片</Typography>
          </Box>
          <Typography color="text.secondary" variant="body2">
            选择本地 png / jpg / webp 文件后会直接进入图库列表，支持一次导入多张，并在列表里点击放大或删除。
          </Typography>
          <Button component="label" startIcon={<CloudUploadRoundedIcon />} variant="contained">
            选择本地图片
            <input
              accept="image/png,image/jpeg,image/webp,image/jpg"
              className="image-upload-input"
              multiple
              onChange={onUpload}
              type="file"
            />
          </Button>
          <Button
            color="secondary"
            disabled={!hasLocalImages || isImporting}
            onClick={onReset}
            startIcon={<RestartAltRoundedIcon />}
            variant="outlined"
          >
            清空已导入图片
          </Button>
          <Divider />
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            <Chip label={hasLocalImages ? `已导入 ${totalUploads} 张本地图片` : '当前仅展示示例图片'} color={hasLocalImages ? 'success' : 'default'} />
            <Chip label={isImporting ? '导入处理中' : '支持批量导入'} variant="outlined" />
          </Box>
        </Stack>
      </CardContent>
    </Card>
  )
})

const readImageDimensions = (src: string) => {
  return new Promise<string>((resolve) => {
    const image = new window.Image()

    image.onload = () => resolve(`${image.naturalWidth} × ${image.naturalHeight}`)
    image.onerror = () => resolve('尺寸读取失败')
    image.src = src
  })
}

const ImageDemo = () => {
  const objectUrlsRef = useRef<string[]>([])
  const viewerViewportRef = useRef<HTMLDivElement | null>(null)
  const viewerDragStartRef = useRef<{ originX: number; originY: number; startX: number; startY: number } | null>(null)
  const [uploadedImages, setUploadedImages] = useState<GalleryImage[]>([])
  const [isImporting, setIsImporting] = useState(false)
  const [isViewerOpen, setIsViewerOpen] = useState(false)
  const [viewerImageId, setViewerImageId] = useState<string | null>(null)
  const [viewerOffset, setViewerOffset] = useState({ x: 0, y: 0 })
  const [viewerScale, setViewerScale] = useState(1)
  const [isViewerDragging, setIsViewerDragging] = useState(false)
  const isCompact = useMediaQuery('(max-width:900px)')
  const isNarrow = useMediaQuery('(max-width:600px)')

  const galleryImages = useMemo(() => [...uploadedImages, ...presetImages], [uploadedImages])
  const viewerImage = useMemo(
    () => galleryImages.find((item) => item.id === viewerImageId) ?? null,
    [galleryImages, viewerImageId],
  )
  const galleryColumns = isNarrow ? 1 : isCompact ? 2 : 3
  const hasLocalImages = uploadedImages.length > 0

  useEffect(() => {
    return () => {
      objectUrlsRef.current.forEach((url) => URL.revokeObjectURL(url))
    }
  }, [])

  const clampViewerOffset = useCallback((nextOffset: { x: number; y: number }, scale: number) => {
    const viewport = viewerViewportRef.current

    if (!viewport || scale <= IMAGE_VIEWER_MIN_SCALE) {
      return { x: 0, y: 0 }
    }

    const maxOffsetX = ((viewport.clientWidth * scale) - viewport.clientWidth) / 2
    const maxOffsetY = ((viewport.clientHeight * scale) - viewport.clientHeight) / 2

    return {
      x: Math.min(maxOffsetX, Math.max(-maxOffsetX, nextOffset.x)),
      y: Math.min(maxOffsetY, Math.max(-maxOffsetY, nextOffset.y)),
    }
  }, [])

  const resetViewerTransform = useCallback(() => {
    viewerDragStartRef.current = null
    setIsViewerDragging(false)
    setViewerScale(IMAGE_VIEWER_MIN_SCALE)
    setViewerOffset({ x: 0, y: 0 })
  }, [])

  const handleOpenViewer = useCallback((imageId: string) => {
    resetViewerTransform()
    setViewerImageId(imageId)
    setIsViewerOpen(true)
  }, [resetViewerTransform])

  const handleCloseViewer = useCallback(() => {
    resetViewerTransform()
    setIsViewerOpen(false)
    setViewerImageId(null)
  }, [resetViewerTransform])

  const handleUpload = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files ?? [])

    event.target.value = ''

    if (!selectedFiles.length) {
      return
    }

    setIsImporting(true)

    void (async () => {
      try {
        const nextImages = await Promise.all(
          selectedFiles.map(async (file, index) => {
            const objectUrl = URL.createObjectURL(file)
            const dimensions = await readImageDimensions(objectUrl)

            objectUrlsRef.current.push(objectUrl)

            return {
              id: `upload-${Date.now()}-${index}-${Math.random().toString(36).slice(2, 8)}`,
              title: file.name,
              src: objectUrl,
              tag: '本地文件',
              dimensions,
              description: LOCAL_IMAGE_DESCRIPTION,
              sourceType: 'upload' as const,
            }
          }),
        )

        setUploadedImages((current) => [...nextImages, ...current])
      }
      finally {
        setIsImporting(false)
      }
    })()
  }, [])

  const handleDeleteImage = useCallback((imageId: string) => {
    const targetImage = uploadedImages.find((item) => item.id === imageId)

    if (!targetImage) {
      return
    }

    URL.revokeObjectURL(targetImage.src)
    objectUrlsRef.current = objectUrlsRef.current.filter((url) => url !== targetImage.src)
    setUploadedImages((current) => current.filter((item) => item.id !== imageId))

    if (viewerImageId === imageId) {
      handleCloseViewer()
    }
  }, [handleCloseViewer, uploadedImages, viewerImageId])

  const handleReset = useCallback(() => {
    if (!uploadedImages.length) {
      return
    }

    uploadedImages.forEach((item) => URL.revokeObjectURL(item.src))
    objectUrlsRef.current = []
    setUploadedImages([])

    if (uploadedImages.some((item) => item.id === viewerImageId)) {
      handleCloseViewer()
    }
  }, [handleCloseViewer, uploadedImages, viewerImageId])

  const updateViewerScale = useCallback((nextScale: number) => {
    const clampedScale = Math.min(IMAGE_VIEWER_MAX_SCALE, Math.max(IMAGE_VIEWER_MIN_SCALE, Number(nextScale.toFixed(2))))

    setViewerScale(clampedScale)
    setViewerOffset((currentOffset) => clampViewerOffset(currentOffset, clampedScale))
  }, [clampViewerOffset])

  const handleViewerWheel = useCallback((event: ReactWheelEvent<HTMLDivElement>) => {
    event.preventDefault()

    const delta = event.deltaY < 0 ? IMAGE_VIEWER_SCALE_STEP : -IMAGE_VIEWER_SCALE_STEP

    updateViewerScale(viewerScale + delta)
  }, [updateViewerScale, viewerScale])

  const handleViewerMouseDown = useCallback((event: ReactMouseEvent<HTMLDivElement>) => {
    if (viewerScale <= IMAGE_VIEWER_MIN_SCALE) {
      return
    }

    event.preventDefault()
    viewerDragStartRef.current = {
      originX: viewerOffset.x,
      originY: viewerOffset.y,
      startX: event.clientX,
      startY: event.clientY,
    }
    setIsViewerDragging(true)
  }, [viewerOffset.x, viewerOffset.y, viewerScale])

  const handleViewerMouseMove = useCallback((event: ReactMouseEvent<HTMLDivElement>) => {
    const dragStart = viewerDragStartRef.current

    if (!dragStart) {
      return
    }

    const nextOffset = {
      x: dragStart.originX + event.clientX - dragStart.startX,
      y: dragStart.originY + event.clientY - dragStart.startY,
    }

    setViewerOffset(clampViewerOffset(nextOffset, viewerScale))
  }, [clampViewerOffset, viewerScale])

  const handleViewerMouseUp = useCallback(() => {
    viewerDragStartRef.current = null
    setIsViewerDragging(false)
  }, [])

  const handleViewerZoomIn = useCallback(() => {
    updateViewerScale(viewerScale + IMAGE_VIEWER_SCALE_STEP)
  }, [updateViewerScale, viewerScale])

  const handleViewerZoomOut = useCallback(() => {
    updateViewerScale(viewerScale - IMAGE_VIEWER_SCALE_STEP)
  }, [updateViewerScale, viewerScale])

  useEffect(() => {
    if (!isViewerOpen || !viewerImage) {
      return
    }

    resetViewerTransform()
  }, [isViewerOpen, resetViewerTransform, viewerImage])

  return (
    <Box component="main" className="image-demo-page" sx={{ minHeight: '100vh', py: { xs: 4, md: 6 } }}>
      <PageContainer>
        <HeroPanel
          className="image-demo-hero"
          kicker="Image Demo"
          title="新建一个图片列表式的上传与预览页面"
          description="这个页面改成了更接近素材图库的布局：支持批量导入本地图片、使用 ImageList 展示图片列表、点击放大预览，以及针对导入图片进行删除。"
          metrics={featureCards}
          side={imageHeroSide}
        />

        <SectionPanel
          className="image-demo-stage"
          kicker="Gallery"
          title="图片列表预览"
          description="左侧是可点击的图片网格列表，右侧用于查看说明并批量导入或清空本地图片。"
        >
          <Grid container spacing={2.5} className="image-demo-layout">
            <Grid size={{ xs: 12, lg: 8 }}>
              <Card className="image-player-card" elevation={0}>
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
                          <Chip className="image-chip" label="ImageList" color="primary" />
                          <Chip className="image-dimensions" label={`共 ${galleryImages.length} 张`} variant="outlined" />
                        </Box>
                        <Box>
                          <Typography variant="h4">图片图库列表</Typography>
                          <Typography color="text.secondary" sx={{ mt: 1, maxWidth: 720 }}>
                            这里会同时展示示例图片和你导入的本地图片。本地导入的内容会优先排在前面，支持点击放大查看，以及单张删除。
                          </Typography>
                        </Box>
                      </Stack>

                      <Paper className="image-status-card" elevation={0}>
                        <Stack spacing={1}>
                          <Typography variant="overline" color="primary.dark">
                            当前状态
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {isImporting
                              ? '图片导入中，列表会在读取完成后自动刷新。'
                              : `图库已就绪，当前包含 ${galleryImages.length} 张图片，其中本地导入 ${uploadedImages.length} 张。`}
                          </Typography>
                        </Stack>
                      </Paper>
                    </Box>

                    <ImageGalleryList
                      columns={galleryColumns}
                      images={galleryImages}
                      isImporting={isImporting}
                      onDelete={handleDeleteImage}
                      onOpenViewer={handleOpenViewer}
                    />
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, lg: 4 }}>
              <Stack spacing={2.5} className="image-side-panel">
                <ImageTipsCard />
                <ImageUploadCard
                  hasLocalImages={hasLocalImages}
                  isImporting={isImporting}
                  onReset={handleReset}
                  onUpload={handleUpload}
                  totalUploads={uploadedImages.length}
                />
              </Stack>
            </Grid>
          </Grid>
        </SectionPanel>
      </PageContainer>

      <Dialog
        className="image-viewer-dialog"
        fullWidth
        maxWidth="lg"
        onClose={handleCloseViewer}
        open={Boolean(isViewerOpen && viewerImage)}
      >
        <IconButton
          aria-label="关闭图片预览"
          className="image-viewer-dialog__close"
          onClick={handleCloseViewer}
        >
          <CloseRoundedIcon />
        </IconButton>

        <DialogContent className="image-viewer-dialog__content">
          <div
            ref={viewerViewportRef}
            className={`image-viewer-dialog__stage${viewerScale > IMAGE_VIEWER_MIN_SCALE ? ' is-zoomed' : ''}${isViewerDragging ? ' is-dragging' : ''}`}
            onMouseDown={handleViewerMouseDown}
            onMouseLeave={handleViewerMouseUp}
            onMouseMove={handleViewerMouseMove}
            onMouseUp={handleViewerMouseUp}
            onWheel={handleViewerWheel}
          >
            {viewerImage ? (
              <img
                alt={viewerImage.title}
                className="image-viewer-dialog__image"
                draggable={false}
                src={viewerImage.src}
                style={{ transform: `translate3d(${viewerOffset.x}px, ${viewerOffset.y}px, 0) scale(${viewerScale})` }}
              />
            ) : null}
          </div>

          <Box className="image-viewer-dialog__meta">
            <Box>
              <Typography variant="h6">{viewerImage?.title}</Typography>
              <Typography color="text.secondary" variant="body2">
                {viewerImage?.dimensions}
              </Typography>
              <Typography color="text.secondary" sx={{ mt: 0.75 }} variant="body2">
                {viewerImage?.description}
              </Typography>
            </Box>

            <Stack className="image-viewer-dialog__actions" direction="row" spacing={1} useFlexGap>
              <Button disabled={viewerScale <= IMAGE_VIEWER_MIN_SCALE} onClick={handleViewerZoomOut} size="small" variant="outlined">
                缩小
              </Button>
              <Button
                disabled={viewerScale === IMAGE_VIEWER_MIN_SCALE && viewerOffset.x === 0 && viewerOffset.y === 0}
                onClick={resetViewerTransform}
                size="small"
                variant="outlined"
              >
                重置
              </Button>
              <Button disabled={viewerScale >= IMAGE_VIEWER_MAX_SCALE} onClick={handleViewerZoomIn} size="small" variant="contained">
                放大
              </Button>
              <Chip label={`缩放 ${Math.round(viewerScale * 100)}%`} size="small" variant="outlined" />
            </Stack>
          </Box>

          <Typography className="image-viewer-dialog__hint" color="text.secondary" variant="body2">
            鼠标滚轮缩放，大于 100% 后可拖拽查看细节。
          </Typography>
        </DialogContent>
      </Dialog>
    </Box>
  )
}

export default ImageDemo
