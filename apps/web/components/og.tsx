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
      {/* Grid background with gradient overlay */}
      <div
        tw="absolute inset-0 flex"
        style={{
          background: 'radial-gradient(49.63% 57.02% at 58.99% -7.2%, rgba(66, 129, 255, 0.1) 39.4%, rgba(0, 0, 0, 0) 100%)',
        }}
      >
        <svg
          width="1200"
          height="630"
          viewBox="0 0 1200 630"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        >
          <defs>
            <pattern
              id="grid-pattern"
              x="0"
              y="0"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="rgba(255, 255, 255, 0.08)"
                strokeWidth="1"
              />
            </pattern>
            <linearGradient id="grid-fade" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={primaryColor} stopOpacity="0" />
              <stop offset="60%" stopColor={primaryColor} stopOpacity="0" />
              <stop offset="100%" stopColor={primaryColor} stopOpacity="1" />
            </linearGradient>
          </defs>
          <rect width="1200" height="630" fill="url(#grid-pattern)" />
          <rect width="1200" height="630" fill="url(#grid-fade)" />
        </svg>
      </div>

      {/* Vertical dashed line */}
      <div
        tw="absolute inset-y-0 left-16 w-[1px] border-l border-dashed"
        style={{
          borderColor: '#404040',
        }}
      />

      {/* Main content container */}
      <div
        tw="flex flex-col justify-between h-full w-full px-24 py-16 relative"
      >
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
              fontFamily: 'Zain, system-ui, -apple-system, sans-serif',
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
                fontFamily: 'Lexend, system-ui, -apple-system, sans-serif',
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
