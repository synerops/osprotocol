interface OGImageProps {
  title: string;
  description?: string;
  site?: string;
  icon?: string;
  primaryColor?: string;
  primaryTextColor?: string;
}

export  function OGImage({
  title,
  description = 'The Agentic Operating System Protocol',
  site = 'os://protocol',
  icon,
  primaryColor = '#0c0a09',
  primaryTextColor = '#1570ef',
}: OGImageProps) {
  return (
    <div
      tw="flex h-full w-full bg-black text-white relative"
      style={{
        backgroundColor: primaryColor,
        color: '#ffffff',
      }}
    >
      {/* Vertical dashed line */}
      <div
        tw="absolute inset-y-0 left-16 w-[1px] border-l border-dashed"
        style={{
          borderColor: '#404040',
        }}
      />

      {/* Main content container */}
      <div tw="flex flex-col justify-between h-full w-full px-24 py-16">
        {/* Top section: Site name and icon */}
        <div tw="flex items-center" style={{ gap: '12px' }}>
          {icon && (
            <div
              tw="flex items-center justify-center w-12 h-12 rounded-lg"
              style={{
                backgroundColor: 'rgba(21, 112, 239, 0.1)',
              }}
            >
              <span tw="text-2xl">{icon}</span>
            </div>
          )}
          <div
            tw="text-xl"
            style={{
              color: '#9ca3af',
              fontFamily: 'JetBrains Mono',
            }}
          >
            {site}
          </div>
        </div>

        {/* Middle section: Title and description */}
        <div tw="flex flex-col flex-1 justify-center" style={{ gap: '24px' }}>
          <h1
            tw="text-6xl font-bold leading-tight"
            style={{
              fontFamily: 'Work Sans, system-ui, -apple-system, sans-serif',
              color: '#ffffff',
            }}
          >
            {title}
          </h1>
          {description && (
            <p
              tw="text-2xl leading-relaxed max-w-4xl"
              style={{
                color: '#d1d5db',
                fontFamily: 'Work Sans, system-ui, -apple-system, sans-serif',
              }}
            >
              {description}
            </p>
          )}
        </div>

        {/* Bottom section: Accent line */}
        <div
          tw="h-1 w-32 rounded-full"
          style={{
            backgroundColor: primaryTextColor,
          }}
        />
      </div>
    </div>
  );
}
