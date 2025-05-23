export type Section = {
  title: string;
  steps: {
    text: string;
    subtext?: string;
    subimage?: string;
  }[];
  question: {
    text: string;
    answer: string;
    explanation: string;
    subimage?: string;
  };
};

export type ModuleData = {
  id: string;
  title: string;
  sections: Section[];
};

export const MODULES_DATA: Record<string, ModuleData> = {
  powerpoint: {
    id: "1",
    title: "How to use PowerPoint",
    sections: [
      {
        title: "Creating a New Slide",
        steps: [
          {
            text: 'Click "New slide" in the upper toolbar to create a new slide page',
            subimage: "",
          },
          {
            text: "Select the Insert tab at the top.",
            subtext:
              "Click the following icon to choose to insert pictures into PPT",
            subimage: "",
          },
          {
            text: 'After adding the text box, return to the "Home" tab. You can see that you can start adjusting the text size and font as well as other functions.',
          },
        ],
        question: {
          text: "Can I create a new slide by pressing this icon?",
          answer: "No",
          explanation: "Click the icon to choose to insert pictures into slide",
          subimage: "",
        },
      },
      {
        title: "How to save the PowerPoint",
        steps: [
          {
            text: "Find the save icon in the upper toolbar and click it to save",
            subimage: "",
          },
          {
            text: 'Click "File" on the far left of the upper toolbar, and select "Save as" in the list on the left to choose what file to save the file as.',
            subimage: "",
          },
        ],
        question: {
          text: "Can I save PowerPoint as PDF when saving using the Save as method?",
          answer: "Yes",
          explanation:
            'Click "File" on the far left of the upper toolbar, and select "Save as" in the list on the left to choose what file to save the file as.',
          subimage: "",
        },
      },
      {
        title: "How to Play the PowerPoint",
        steps: [
          {
            text: "Select the last show icon in the upper toolbar and click it to show the slideshow you made.",
          },
          {
            text: 'Select the "Slide Show" tab and select the two buttons below to start playing the slide show.',
          },
        ],
        question: {
          text: "Can I press this icon to play the slideshow I created from the beginning?",
          answer: "Yes",
          explanation:
            'Select the "Slide Show" tab and select the buttons below to start playing the slide show from beginning.',
        },
      },
    ],
  },
  word: {
    id: "2",
    title: "How to use Microsoft Word",
    sections: [
      {
        title: "Creating a New Document",
        steps: [
          {
            text: "Open Word and click on 'Blank document' from the start screen, or use Ctrl+N shortcut",
            subimage: "",
          },
          {
            text: "Start typing your content in the blank document",
            subimage: "",
          },
          {
            text: "Use the ribbon at the top to format your text and paragraphs",
            subimage: "",
          },
        ],
        question: {
          text: "Can I create a new document using the Ctrl+O shortcut?",
          answer: "No",
          explanation:
            "Ctrl+O is used to open existing documents. For creating new documents, use Ctrl+N.",
          subimage: "",
        },
      },
      {
        title: "Formatting Text in Word",
        steps: [
          {
            text: "Select the text you want to format by clicking and dragging",
          },
          {
            text: "Use the Home tab to access font options, paragraph settings, and styles",
          },
          {
            text: "Apply headings, bold, italic, or change font size as needed",
          },
        ],
        question: {
          text: "Can I apply multiple formatting options like bold and italic to the same text?",
          answer: "Yes",
          explanation:
            "You can apply multiple formatting options to the same text by selecting it and clicking on different formatting options.",
        },
      },
      {
        title: "Saving Your Word Document",
        steps: [
          {
            text: "Click the Save icon in the Quick Access Toolbar or press Ctrl+S",
          },
          {
            text: "Choose a location, enter a filename, and select the file format",
          },
          {
            text: "Click Save to complete the process",
          },
        ],
        question: {
          text: "Can Word documents be saved in PDF format directly?",
          answer: "Yes",
          explanation:
            "You can save a Word document as PDF by selecting 'PDF' from the 'Save as type' dropdown in the Save dialog.",
        },
      },
    ],
  },
  excel: {
    id: "3",
    title: "How to use Microsoft Excel",
    sections: [
      {
        title: "Creating a New Spreadsheet",
        steps: [
          {
            text: "Open Excel and select 'Blank workbook' or press Ctrl+N",
          },
          {
            text: "Enter data into cells by clicking on a cell and typing",
          },
          {
            text: "Navigate between cells using arrow keys or Tab key",
          },
        ],
        question: {
          text: "Does Excel automatically create multiple sheets in a new workbook?",
          answer: "Yes",
          explanation:
            "Excel typically creates a new workbook with multiple sheets (usually three) by default.",
        },
      },
      {
        title: "Using Basic Formulas",
        steps: [
          {
            text: "To create a formula, click a cell and type '=' followed by your formula",
          },
          {
            text: "Use operators like +, -, *, / for basic calculations",
          },
          {
            text: "Reference other cells by their coordinates (e.g., A1, B2)",
            subtext: "You can also click cells to add them to your formula",
          },
        ],
        question: {
          text: "Can Excel formulas reference cells from different sheets?",
          answer: "Yes",
          explanation:
            "You can reference cells from different sheets using the syntax: SheetName!CellReference (e.g., Sheet2!A1).",
        },
      },
      {
        title: "Creating Charts and Graphs",
        steps: [
          {
            text: "Select the data you want to visualize",
          },
          {
            text: "Go to the Insert tab and choose the desired chart type",
          },
          {
            text: "Customize your chart using the Chart Design and Format tabs",
          },
        ],
        question: {
          text: "Can I change the chart type after creating it?",
          answer: "Yes",
          explanation:
            "You can change the chart type by selecting the chart and using the 'Change Chart Type' option in the Chart Design tab.",
        },
      },
    ],
  },
  zoom: {
    id: "4",
    title: "How to use Zoom",
    sections: [
      {
        title: "Starting a New Meeting",
        steps: [
          {
            text: "Open the Zoom desktop application and sign in to your account",
          },
          {
            text: "Click on the 'New Meeting' button on the home screen",
            subtext:
              "You can also select whether to start with video on or off",
          },
          {
            text: "Click 'Join with Computer Audio' when prompted to connect to the meeting audio",
          },
        ],
        question: {
          text: "Can I start a Zoom meeting without signing in to my account?",
          answer: "No",
          explanation:
            "You need to be signed in to your Zoom account to start a new meeting as the host.",
        },
      },
      {
        title: "Inviting Participants",
        steps: [
          {
            text: "Click the 'Participants' button in the meeting controls at the bottom of the screen",
          },
          {
            text: "Click 'Invite' at the bottom of the Participants panel",
            subtext: "You can copy the meeting link or send invites via email",
          },
          {
            text: "Share the meeting ID and passcode with participants if needed",
          },
        ],
        question: {
          text: "Can I invite someone to join a meeting that's already in progress?",
          answer: "Yes",
          explanation:
            "You can invite new participants at any time during a Zoom meeting by using the Participants panel and clicking 'Invite'.",
        },
      },
      {
        title: "Sharing Your Screen",
        steps: [
          {
            text: "Click the 'Share Screen' button in the meeting controls",
          },
          {
            text: "Select the window, application, or desktop you want to share",
            subtext:
              "You can also choose to share a whiteboard or your phone/tablet screen",
          },
          {
            text: "Click the 'Share' button to begin screen sharing",
          },
        ],
        question: {
          text: "Can multiple participants share their screens simultaneously?",
          answer: "Yes",
          explanation:
            "Zoom allows multiple participants to share screens simultaneously if the host enables this option in the meeting settings.",
        },
      },
    ],
  },
  teams: {
    id: "5",
    title: "How to use Microsoft Teams",
    sections: [
      {
        title: "Creating a New Team",
        steps: [
          {
            text: "Click on 'Teams' in the left sidebar, then click 'Join or create a team' at the bottom",
          },
          {
            text: "Select 'Create team' and choose the type of team you want to create",
            subtext:
              "Options include Private, Public, or From an existing team/group",
          },
          {
            text: "Name your team, add an optional description, and click 'Create'",
          },
        ],
        question: {
          text: "Can I create a team that's visible to everyone in my organization?",
          answer: "Yes",
          explanation:
            "You can create a 'Public' team that is visible to everyone in your organization, allowing them to join without approval.",
        },
      },
      {
        title: "Starting a Video Meeting",
        steps: [
          {
            text: "Click on the 'Calendar' icon in the left sidebar and select 'New meeting'",
          },
          {
            text: "Fill in the meeting details including title, date/time, and participants",
            subtext:
              "You can also schedule a meeting directly from a chat or channel",
          },
          {
            text: "Click 'Send' to schedule the meeting and notify participants",
          },
        ],
        question: {
          text: "Can I start an immediate meeting without scheduling it first?",
          answer: "Yes",
          explanation:
            "You can start an immediate meeting by clicking the 'Meet now' button in a channel or from the Calendar tab.",
        },
      },
      {
        title: "Sharing Files in Teams",
        steps: [
          {
            text: "Navigate to the channel or chat where you want to share files",
          },
          {
            text: "Click the paperclip icon in the compose box at the bottom",
            subtext:
              "You can also drag and drop files directly into the compose box",
          },
          {
            text: "Select the file you want to share and click 'Open' to upload and share it",
          },
        ],
        question: {
          text: "Can team members collaborate on shared files in real-time?",
          answer: "Yes",
          explanation:
            "Microsoft Teams integrates with Office 365, allowing multiple users to edit Word, Excel, and PowerPoint files simultaneously in real-time.",
        },
      },
    ],
  },

  linkedin: {
    id: "6",
    title: "How to Use LinkedIn",
    sections: [
      {
        title: "Creating a Professional Profile",
        steps: [
          {
            text: "Sign up for a LinkedIn account at linkedin.com",
          },
          {
            text: "Add your professional photo, name, and a headline that summarizes your role or goal",
          },
          {
            text: "Fill in sections like work experience, education, and skills to complete your profile",
          },
        ],
        question: {
          text: "Is it necessary to add a professional photo to your LinkedIn profile?",
          answer: "Yes",
          explanation:
            "A professional photo makes your profile more credible and approachable.",
        },
      },
      {
        title: "Messaging and Connecting with Others",
        steps: [
          {
            text: "Send connection requests to people you know or want to network with",
          },
          {
            text: "Use LinkedIn Messaging to communicate with your existing connections",
          },
          {
            text: "Upgrade to Premium to use InMail for messaging people outside your network",
          },
        ],
        question: {
          text: "Can you message someone outside your network without Premium?",
          answer: "No",
          explanation:
            "Messaging people outside your network requires LinkedIn Premium or InMail credits.",
        },
      },
      {
        title: "Using LinkedIn to Find and Apply for Jobs",
        steps: [
          {
            text: "Click on the 'Jobs' tab in the LinkedIn menu",
          },
          {
            text: "Search for jobs using filters like location, company, or job title",
          },
          {
            text: "Click 'Easy Apply' on jobs that allow direct applications through LinkedIn",
          },
        ],
        question: {
          text: "Can I apply for jobs directly through LinkedIn?",
          answer: "Yes",
          explanation:
            "Many jobs on LinkedIn offer an 'Easy Apply' option that allows you to apply directly through the platform without visiting external websites.",
        },
      },
      {
        title: "Managing Privacy Settings",
        steps: [
          {
            text: "Go to Settings & Privacy in your LinkedIn profile menu",
          },
          {
            text: "Choose what information is visible to others, such as your profile picture and activity",
          },
          {
            text: "Enable 'Open to Work' to privately signal recruiters that you're job hunting",
          },
        ],
        question: {
          text: "Can recruiters see that I'm looking for work without my current employer knowing?",
          answer: "Yes",
          explanation:
            "LinkedIn's 'Open to Work' feature can be set to be visible only to recruiters, keeping this information private from your current employer.",
        },
      },
      {
        title: "Sharing Content on LinkedIn",
        steps: [
          {
            text: "Click 'Start a post' on your homepage to share a thought, update, or article",
          },
          {
            text: "Use images, videos, or links to make your posts more engaging",
          },
          {
            text: "Write long-form articles using LinkedIn's publishing platform to build authority",
          },
        ],
        question: {
          text: "Can I schedule posts to be published at a later time on LinkedIn?",
          answer: "No",
          explanation:
            "Standard LinkedIn accounts don't have a built-in scheduling feature. To schedule posts, you would need to use a third-party social media management tool.",
        },
      },
    ],
  },
};

export const getSeniorityColor = (seniority: string | null) => {
  if (!seniority) return "bg-slate-100 text-slate-800 hover:bg-slate-100/80";

  const seniorityLower = seniority.toLowerCase();

  if (seniorityLower.includes("entry")) {
    return "bg-blue-100 text-blue-800 hover:bg-blue-100/80";
  } else if (
    seniorityLower.includes("mid") ||
    seniorityLower.includes("senior")
  ) {
    return "bg-green-100 text-green-800 hover:bg-green-100/80";
  } else if (seniorityLower.includes("associate")) {
    return "bg-purple-100 text-purple-800 hover:bg-purple-100/80";
  } else if (seniorityLower.includes("director")) {
    return "bg-amber-100 text-amber-800 hover:bg-amber-100/80";
  } else if (seniorityLower.includes("not applicable")) {
    return "bg-gray-100 text-gray-800 hover:bg-gray-100/80";
  } else {
    return "bg-slate-100 text-slate-800 hover:bg-slate-100/80";
  }
};

export const getEmploymentTypeColor = (type: string | null) => {
  if (!type) return "bg-slate-100 text-slate-800 hover:bg-slate-100/80";

  const typeLower = type.toLowerCase();

  if (typeLower.includes("temp")) {
    return "bg-emerald-100 text-emerald-800 hover:bg-emerald-100/80";
  } else if (typeLower.includes("part")) {
    return "bg-sky-100 text-sky-800 hover:bg-sky-100/80";
  } else if (typeLower.includes("full")) {
    return "bg-pink-100 text-pink-800 hover:bg-pink-100/80";
  } else if (typeLower.includes("other") || typeLower.includes("contract")) {
    return "bg-orange-100 text-orange-800 hover:bg-orange-100/80";
  } else {
    return "bg-slate-100 text-slate-800 hover:bg-slate-100/80";
  }
};

export const getCountryColor = (country: string | null) => {
  if (!country) return "bg-slate-100 text-slate-800 hover:bg-slate-100/80";

  const countryLower = country.toLowerCase();

  if (countryLower.includes("australia") || countryLower.includes("aus")) {
    return "bg-red-100 text-red-800 hover:bg-red-100/80";
  } else if (
    countryLower.includes("united states") ||
    countryLower.includes("us") ||
    countryLower.includes("usa")
  ) {
    return "bg-blue-100 text-blue-800 hover:bg-blue-100/80";
  } else if (countryLower.includes("china")) {
    return "bg-indigo-100 text-indigo-800 hover:bg-indigo-100/80";
  } else if (
    countryLower.includes("united kingdom") ||
    countryLower.includes("uk")
  ) {
    return "bg-purple-100 text-purple-800 hover:bg-purple-100/80";
  } else {
    return "bg-slate-100 text-slate-800 hover:bg-slate-100/80";
  }
};


